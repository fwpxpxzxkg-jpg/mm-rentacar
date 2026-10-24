import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshReflectorMaterial, Sparkles, useGLTF, useProgress, useTexture } from '@react-three/drei'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

// Model dosyaları public/models içinde (three.js örnek Ferrari 458 modeli, Draco sıkıştırmalı)
const BASE = import.meta.env.BASE_URL
const MODEL_URL = BASE + 'models/ferrari.glb'
const AO_URL = BASE + 'models/ferrari_ao.png'
// Gerçek fotoğraf stüdyosu ışığı (Poly Haven "Studio Small 09", CC0) → boyada gerçekçi yansımalar
const HDR_URL = BASE + 'hdr/studio.hdr'
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'

const RED = '#e10600'
const damp = THREE.MathUtils.damp
const lerp = THREE.MathUtils.lerp

/* ------------------------------------------------------------------ */
/*  Ferrari: dönen gövde, parlayan far/stop lambaları                  */
/* ------------------------------------------------------------------ */
function Ferrari({ progress, isMobile }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_URL)
  const ao = useTexture(AO_URL)
  const group = useRef()
  const born = useRef(null)

  // Gerçekçi malzemeler: Rosso Corsa çok katmanlı boya, gerçek cam, krom jant, mat lastik.
  // Farlar/stoplar modelin kendi lamba parçalarında yanar (sahte ışık topu yok).
  const { model, lamps, z } = useMemo(() => {
    // Önbellekteki orijinal sahneyi değil kopyasını kullan: bileşen yeniden
    // yüklense de model kaybolmaz
    const model = scene.clone(true)
    const body = new THREE.MeshPhysicalMaterial({
      color: '#b3090d', metalness: 0.55, roughness: 0.33, // alt kat: Rosso Corsa
      clearcoat: 1, clearcoatRoughness: 0.01,             // üst kat: cam gibi vernik
      envMapIntensity: 1
    })
    const rims = new THREE.MeshStandardMaterial({ color: '#a9a9ab', metalness: 1, roughness: 0.24 }) // alüminyum jant
    const rubber = new THREE.MeshStandardMaterial({ color: '#0d0d0d', metalness: 0, roughness: 0.9 })
    const glass = isMobile
      ? new THREE.MeshPhysicalMaterial({ color: '#0a0a0a', metalness: 0.3, roughness: 0, transparent: true, opacity: 0.5, envMapIntensity: 1.5 })
      : new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0.2, roughness: 0, transmission: 1, ior: 1.5, thickness: 0.02 })
    const tail = new THREE.MeshPhysicalMaterial({ color: '#4a0000', emissive: '#ff1a0d', emissiveIntensity: 0, roughness: 0.1, clearcoat: 1 })
    const leds = new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff3e2', emissiveIntensity: 0 })

    const set = (name, mat) => { const o = model.getObjectByName(name); if (o) o.material = mat }
    set('body', body)
    ;['rim_fl', 'rim_fr', 'rim_rr', 'rim_rl', 'trim', 'chrome'].forEach((n) => set(n, rims))
    set('glass', glass)
    set('lights_red', tail)
    set('leds', leds)
    model.traverse((o) => { if (o.isMesh && o.name === 'tire') o.material = rubber })

    // Arka lamba ışığının zemine vurduğu nokta için aracın boyu (burun -z yönünde)
    const box = new THREE.Box3().setFromObject(model.getObjectByName('body') || model)
    return { model, lamps: { tail, leds }, z: { front: box.min.z, back: box.max.z } }
  }, [scene, isMobile])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (born.current === null) born.current = t
    const age = t - born.current
    const p = progress.get()
    const g = group.current

    // Yavaş 360° dönüş; kaydırınca biraz yavaşlar
    g.rotation.y += dt * (0.3 - p * 0.15)
    // Kaydırma: masaüstünde sağa kayar, mobilde geriye/yukarı çekilir
    g.position.x = damp(g.position.x, isMobile ? 0 : p * 2.7, 5, dt)
    g.position.z = damp(g.position.z, isMobile ? -p * 2.5 : 0, 5, dt)

    // Farlar: girişte iki kez "selektör", sonra hafifçe nefes alır
    const ignition = age < 0.7 ? 0 : age < 0.85 ? 1 : age < 1.05 ? 0 : 1
    const k = ignition * (0.9 + 0.1 * Math.sin(t * 2.4))
    lamps.leds.emissiveIntensity = 4 * k
    lamps.tail.emissiveIntensity = 3 * k
  })

  return (
    <group ref={group}>
      <primitive object={model} />
      {/* Araç altı gölge */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.004} renderOrder={2}>
        <planeGeometry args={[0.655 * 4, 1.3 * 4]} />
        <meshBasicMaterial map={ao} blending={THREE.MultiplyBlending} toneMapped={false} transparent premultipliedAlpha />
      </mesh>
      {/* Stop ve far ışığının zemine düşen yumuşak yansıması */}
      <pointLight position={[0, 0.45, z.back + 0.5]} color={RED} intensity={3} distance={3.5} />
      <pointLight position={[0, 0.45, z.front - 0.5]} color="#fff3e0" intensity={2} distance={3} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Kamera: sinematik yaklaşma + fareyle hafif paralaks                */
/* ------------------------------------------------------------------ */
function CameraRig({ progress, isMobile }) {
  const start = useRef(null)
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, dt) => {
    const t0 = state.clock.elapsedTime
    if (start.current === null) start.current = t0
    const t = Math.min((t0 - start.current) / 4, 1)
    const e = 1 - Math.pow(1 - t, 3)
    const p = progress.get()
    // Dikey ekranda yatay görüş dar olduğu için kamera daha uzakta durur
    const z = lerp(isMobile ? 22 : 16, isMobile ? 15.5 : 8.4, e) + p * 1.2
    const y = lerp(5, 1.45, e) + p * 0.5
    v.set(state.pointer.x * 0.7, y + state.pointer.y * 0.25, z)
    if (t < 1) state.camera.position.copy(v)
    else state.camera.position.lerp(v, 1 - Math.exp(-3 * dt))
    // Bakış noktası aracın altında: araç ekranda yukarıda kalır, başlığa yer açılır
    state.camera.lookAt(0, (isMobile ? -0.7 : -0.35) + p * 0.6, 0)
  })
  return null
}

/* ------------------------------------------------------------------ */
/*  Zemin: masaüstünde yansımalı, mobilde hafif malzeme                */
/* ------------------------------------------------------------------ */
function Floor({ isMobile }) {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[70, 70]} />
        {isMobile ? (
          <meshStandardMaterial color="#0c0c0c" roughness={0.5} metalness={0.5} />
        ) : (
          <MeshReflectorMaterial
            blur={[300, 90]} resolution={1024} mixBlur={1} mixStrength={50} roughness={1}
            depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
            color="#0b0b0b" metalness={0.6} mirror={0}
          />
        )}
      </mesh>
      {/* Showroom döner tabla halkası */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.006}>
        <ringGeometry args={[3.05, 3.12, 128]} />
        <meshBasicMaterial color={[3, 0.05, 0]} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
        <ringGeometry args={[3.3, 3.32, 128]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.35} />
      </mesh>
    </>
  )
}

/** Yükleme yüzdesini dışarıdaki açılış ekranına iletir */
function ProgressReporter({ onProgress }) {
  const { progress } = useProgress()
  useEffect(() => { onProgress?.(progress) }, [progress, onProgress])
  return null
}

export default function HeroScene({ progress, isMobile, onProgress }) {
  // Hero ekrandan çıkınca çizimi durdur (pil / performans)
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="h-full w-full">
      <ProgressReporter onProgress={onProgress} />
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 5, 16], fov: 35, near: 0.1, far: 80 }}
        // Neutral ton eşleme: Ferrari kırmızısı turuncuya kaymadan gerçek rengiyle görünür
        gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.NeutralToneMapping }}
        aria-label="Dönen kırmızı Ferrari 3D animasyonu"
        role="img"
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 9, 26]} />
        <ambientLight intensity={0.15} />
        <spotLight position={[0, 9, 0]} angle={0.5} penumbra={1} intensity={60} color="#ffffff" />

        {/* Gerçek stüdyo HDRI'si + tavan softbox şeritleri: boyada fotoğraftaki gibi yansımalar */}
        <Environment files={HDR_URL} resolution={512} environmentIntensity={0.75}>
          <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 6, 0]} scale={[10, 1.6, 1]} />
          <Lightformer intensity={0.9} rotation-x={Math.PI / 2} position={[0, 6, -4]} scale={[10, 0.5, 1]} />
          <Lightformer intensity={0.9} rotation-x={Math.PI / 2} position={[0, 6, 4]} scale={[10, 0.5, 1]} />
        </Environment>

        <Ferrari progress={progress} isMobile={isMobile} />
        <CameraRig progress={progress} isMobile={isMobile} />
        <Floor isMobile={isMobile} />

        {/* Havada süzülen ışık tozları */}
        <Sparkles count={isMobile ? 40 : 110} scale={[16, 5, 16]} position={[0, 2.2, 0]} size={2.4} speed={0.25} opacity={0.7} color="#d4af37" />
        <Sparkles count={isMobile ? 15 : 40} scale={[12, 3, 12]} position={[0, 1.5, 0]} size={3} speed={0.35} opacity={0.6} color={RED} />

        {!isMobile && (
          <EffectComposer disableNormalPass multisampling={4}>
            <Bloom luminanceThreshold={1.1} luminanceSmoothing={0.25} intensity={0.55} mipmapBlur />
            <Vignette offset={0.25} darkness={0.85} />
            <ToneMapping mode={ToneMappingMode.NEUTRAL} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_URL, DRACO_URL)
