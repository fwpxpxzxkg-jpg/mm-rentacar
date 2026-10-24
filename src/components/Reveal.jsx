import { motion } from 'framer-motion'

/** Kaydırınca yumuşakça beliren sarmalayıcı */
export default function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </M>
  )
}

/** Bölüm başlığı */
export function SectionHead({ eyebrow, title, text, center = true }) {
  return (
    <Reveal className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="mt-4 text-white/60">{text}</p>}
    </Reveal>
  )
}
