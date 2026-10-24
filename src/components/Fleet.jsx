import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Gauge, Users, Zap, Settings2 } from 'lucide-react'
import { CARS, formatPrice } from '../config'
import CarArt from './CarArt'
import Reveal, { SectionHead } from './Reveal'

/** Fareyle eğilen (3D tilt) ve parlayan kart */
function TiltCard({ children }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,.14), transparent 45%)`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-full"
    >
      {children}
      <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function Fleet({ onRent }) {
  return (
    <section id="filo" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-racing/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Araç Filosu"
          title={<>Hayalindeki <span className="text-racing">Aracı</span> Seç</>}
          text="Bakımlı, sigortalı ve kapına teslim premium araçlar."
        />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {CARS.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 0.1} className="h-full">
              <TiltCard>
                <article className="glass relative flex h-full flex-col overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(225,6,0,.55)] group-hover:border-racing/40">
                  {/* Görsel alanı */}
                  <div className="relative h-52 overflow-hidden bg-[radial-gradient(80%_70%_at_50%_100%,rgba(255,255,255,.08),transparent_70%)]">
                    <span className="pointer-events-none absolute inset-x-0 top-5 select-none text-center font-display text-5xl font-black uppercase tracking-tight text-white/[0.05]">
                      {car.brand}
                    </span>
                    <div className="absolute inset-x-6 bottom-3 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-105">
                      {car.image ? (
                        <img src={car.image} alt={`${car.brand} ${car.model}`} loading="lazy" className="mx-auto max-h-44 object-contain" />
                      ) : (
                        <CarArt shape={car.shape} color={car.color} id={car.id} />
                      )}
                    </div>
                    <span className="absolute left-5 top-5 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
                      {car.brand}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold uppercase">
                      {car.brand} <span className="text-white/60">{car.model}</span>
                    </h3>
                    <ul className="mt-4 grid grid-cols-4 gap-2 text-center text-[11px] text-white/60">
                      <li className="rounded-xl bg-white/[0.04] py-2"><Zap size={14} className="mx-auto mb-1 text-gold" aria-hidden="true" />{car.hp} HP</li>
                      <li className="rounded-xl bg-white/[0.04] py-2"><Gauge size={14} className="mx-auto mb-1 text-gold" aria-hidden="true" />{car.acc}s</li>
                      <li className="rounded-xl bg-white/[0.04] py-2"><Users size={14} className="mx-auto mb-1 text-gold" aria-hidden="true" />{car.seats} kişi</li>
                      <li className="rounded-xl bg-white/[0.04] py-2"><Settings2 size={14} className="mx-auto mb-1 text-gold" aria-hidden="true" />Oto.</li>
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5 mt-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Günlük</div>
                        <div className="font-display text-2xl font-black">{formatPrice(car.price)}</div>
                      </div>
                      <button onClick={() => onRent(car.id)} className="btn-neon !px-5 !py-2.5" aria-label={`${car.brand} ${car.model} kirala`}>
                        Kirala
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/35">* Fiyatlar örnek niteliğindedir; tarih ve sezona göre değişebilir.</p>
      </div>
    </section>
  )
}
