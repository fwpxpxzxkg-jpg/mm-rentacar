import { Quote, Star } from 'lucide-react'
import { REVIEWS } from '../config'
import Reveal, { SectionHead } from './Reveal'

export default function Testimonials() {
  return (
    <section id="yorumlar" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Müşteri Yorumları" title={<>Onlar <span className="text-racing">Sürdü</span></>} />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12}>
              <figure className="glass relative h-full p-8">
                <Quote className="absolute right-6 top-6 text-white/10" size={48} aria-hidden="true" />
                <div className="flex gap-1" aria-label={`${r.stars} üzerinden 5 yıldız`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={18} className={k < r.stars ? 'fill-gold text-gold' : 'text-white/20'} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 leading-relaxed text-white/75">“{r.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-racing to-gold font-display font-bold">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold">{r.name}</span>
                    <span className="text-xs text-white/45">{r.city} · {r.car}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
