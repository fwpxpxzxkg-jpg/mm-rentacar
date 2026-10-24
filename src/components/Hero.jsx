import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Gauge, Zap, Timer } from 'lucide-react'
import { CARS, openWhatsApp } from '../config'
import { useCurrency } from '../currency'

// 3D sahne ayrı dosyada ve "lazy" yüklenir: sayfa anında açılır, model arkadan gelir
const HeroScene = lazy(() => import('./HeroScene'))

/** 3D yüklenemezse (eski cihaz / WebGL yok) site yine çalışsın */
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFail?.() }
  render() { return this.state.failed ? null : this.props.children }
}

/** Açılış yükleme ekranı (model indirilirken) */
function Loader({ progress, forceHide }) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    if (progress >= 100 || forceHide) { const t = setTimeout(() => setHidden(true), 500); return () => clearTimeout(t) }
  }, [progress, forceHide])
  useEffect(() => { const t = setTimeout(() => setHidden(true), 15000); return () => clearTimeout(t) }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[60] grid place-items-center bg-ink transition-opacity duration-1000 ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center">
        <div className="font-display text-6xl font-black tracking-wider sm:text-7xl">
          M<span className="text-racing">&amp;</span>M
        </div>
        <div className="mx-auto mt-8 h-[2px] w-56 overflow-hidden rounded bg-white/10">
          <div className="h-full bg-gradient-to-r from-racing to-gold transition-all duration-300" style={{ width: `${Math.max(5, progress)}%` }} />
        </div>
        <p className="mt-3 font-display text-[10px] tracking-[0.4em] text-white/40">MOTOR ISINIYOR · {Math.round(progress)}%</p>
      </div>
    </div>
  )
}

export default function Hero({ isMobile }) {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)
  const featured = CARS[0]
  const { fmt } = useCurrency()

  // Hero 220vh yüksekliğinde; içerik "sticky". Kaydırma ilerlemesi 0 → 1
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -90])
  const infoOpacity = useTransform(scrollYProgress, [0.32, 0.62], [0, 1])
  const infoX = useTransform(scrollYProgress, [0.32, 0.62], [isMobile ? 0 : -70, 0])
  const infoY = useTransform(scrollYProgress, [0.32, 0.62], [isMobile ? 60 : 0, 0])

  return (
    <section id="top" ref={ref} className="relative h-[220vh] bg-ink" aria-label="Giriş">
      <Loader progress={progress} forceHide={failed} />

      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        {/* 3D Ferrari */}
        <div className="absolute inset-0">
          {failed ? (
            <div className="h-full w-full bg-[radial-gradient(60%_50%_at_50%_60%,rgba(225,6,0,.35),transparent_70%)]" />
          ) : (
            <SceneBoundary onFail={() => setFailed(true)}>
              <Suspense fallback={null}>
                <HeroScene progress={scrollYProgress} isMobile={isMobile} onProgress={setProgress} />
              </Suspense>
            </SceneBoundary>
          )}
        </div>

        {/* Kenar karartmaları */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

        {/* Başlık */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-x-0 bottom-[9vh] px-4 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="eyebrow justify-center"
          >
            Premium Araç Kiralama
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
            transition={{ delay: 1.4, duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 font-display text-[clamp(2rem,7.2vw,6.5rem)] font-black leading-[0.95]"
          >
            <span className="metal-text">LÜKSÜ KİRALA</span>{' '}
            <span className="text-racing [text-shadow:0_0_30px_rgba(225,6,0,.8)]">—</span>{' '}
            <span className="metal-text">HAYALİ SÜR</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a href="#filo" className="btn-neon">Filoyu Keşfet</a>
            <a href="#rezervasyon" className="btn-glass">Rezervasyon</a>
          </motion.div>
        </motion.div>

        {/* Kaydırınca açılan öne çıkan araç paneli (Ferrari sağa kayar) */}
        <div className="pointer-events-none absolute inset-0 flex items-end px-4 pb-[8vh] md:items-center md:px-12 md:pb-0">
          <motion.div
            style={{ opacity: infoOpacity, x: infoX, y: infoY }}
            className="glass pointer-events-auto w-full max-w-md p-7 sm:p-9"
          >
            <p className="eyebrow">Ayın Yıldızı</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-4xl">
              {featured.brand}<br /><span className="text-racing">{featured.model}</span>
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                [Zap, featured.hp, 'HP'],
                [Timer, featured.acc + 's', '0-100'],
                [Gauge, '330', 'km/s']
              ].map(([Icon, v, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3">
                  <Icon className="mx-auto mb-1 text-gold" size={18} aria-hidden="true" />
                  <div className="font-display text-lg font-bold">{v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/50">Günlük</div>
                <div className="font-display text-3xl font-black">{fmt(featured.price)}</div>
              </div>
              <button
                className="btn-neon"
                onClick={() => openWhatsApp(`Merhaba, ${featured.brand} ${featured.model} kiralamak istiyorum. Müsaitlik durumunu öğrenebilir miyim?`)}
              >
                Kirala
              </button>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#filo"
          style={{ opacity: titleOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 hover:text-white"
          aria-label="Aşağı kaydır"
        >
          <ChevronDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}
