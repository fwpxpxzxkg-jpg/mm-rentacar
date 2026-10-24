import { BadgeCheck, Headset, ShieldCheck, Truck } from 'lucide-react'
import Reveal, { SectionHead } from './Reveal'

// [AVANTAJLAR] → müşterinin gerçekten sunduğu hizmetlerle teyit edin
const ITEMS = [
  { icon: ShieldCheck, title: 'Sigorta Dahil', text: 'Tüm araçlarımız kapsamlı kasko ve trafik sigortası ile teslim edilir.' },
  { icon: Headset, title: '7/24 Destek', text: 'Yolda ne olursa olsun, WhatsApp hattımız gece gündüz açık.' },
  { icon: Truck, title: 'Ücretsiz Teslimat', text: 'Havalimanı, otel ya da adresinize aracı biz getiririz.' },
  { icon: BadgeCheck, title: 'Sıfır Km Araçlar', text: 'Filomuz yeni model, düzenli bakımlı ve kusursuz temizlikte.' }
]

export default function WhyUs() {
  return (
    <section id="neden-biz" className="relative border-y border-white/5 bg-gradient-to-b from-ink via-[#0f0f0f] to-ink py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="Neden Biz?" title={<>Farkı <span className="text-gold">Hisset</span></>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="glass group h-full p-8 transition duration-500 hover:-translate-y-2 hover:border-gold/40">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-racing to-[#7a0300] shadow-[0_10px_30px_-8px_rgba(225,6,0,.8)] transition group-hover:shadow-[0_0_40px_0_rgba(225,6,0,.7)]">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
