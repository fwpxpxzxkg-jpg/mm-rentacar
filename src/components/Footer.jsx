import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { SITE, waLink } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

export default function Footer() {
  return (
    <footer id="iletisim" className="relative border-t border-white/5 bg-[#070707] pb-10 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-racing to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="font-display text-3xl font-black tracking-wider">M<span className="text-racing">&amp;</span>M</div>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">Luxury Rent a Car</p>
          <p className="mt-5 text-sm leading-relaxed text-white/50">Lüksü kirala, hayali sür. Premium araçlar, kusursuz hizmet.</p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition hover:border-racing hover:bg-racing"><Instagram size={18} /></a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition hover:border-racing hover:bg-racing"><Facebook size={18} /></a>
            <a href={waLink('Merhaba, bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition hover:border-wa hover:bg-wa"><WhatsAppIcon className="h-[18px] w-[18px]" /></a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">İletişim</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li><a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-white"><Phone size={16} className="text-racing" aria-hidden="true" />{SITE.phoneLabel}</a></li>
            <li><a href={waLink('Merhaba, bilgi almak istiyorum.')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white"><WhatsAppIcon className="h-4 w-4 text-wa" />{SITE.whatsappLabel}</a></li>
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-racing" aria-hidden="true" />{SITE.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">Çalışma Saatleri</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {SITE.hours.map(([d, h]) => (
              <li key={d} className="flex items-center gap-3"><Clock size={16} className="text-racing" aria-hidden="true" /><span>{d}<br /><span className="text-white/45">{h}</span></span></li>
            ))}
            <li className="pt-1 text-xs text-white/40">WhatsApp hattı 7/24 açık</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold">Konum</h3>
          <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 block overflow-hidden rounded-2xl border border-white/10" aria-label="Haritada aç">
            <div className="relative grid h-36 place-items-center bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:22px_22px]">
              <MapPin size={34} className="text-racing drop-shadow-[0_0_12px_rgba(225,6,0,.9)] transition group-hover:-translate-y-1" aria-hidden="true" />
              <span className="absolute bottom-3 text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-white">Haritada Aç →</span>
            </div>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/5 px-4 pt-8 text-xs text-white/35 sm:px-6">
        <span>© {new Date().getFullYear()} M&amp;M Luxury Rent a Car. Tüm hakları saklıdır.</span>
        <span>Üsküp · Ohri · Tetova · Bitola</span>
      </div>
    </footer>
  )
}
