import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { CurrencyToggle } from '../currency'

const LINKS = [
  ['Filo', '#filo'],
  ['Neden Biz', '#neden-biz'],
  ['Rezervasyon', '#rezervasyon'],
  ['Yorumlar', '#yorumlar'],
  ['İletişim', '#iletisim']
]

/** Sticky menü: en üstte saydam, kaydırınca siyaha döner */
export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open ? 'border-b border-white/5 bg-ink/90 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Ana menü">
        <a href="#top" className="flex items-center gap-3" aria-label="M&M Luxury Rent a Car — ana sayfa">
          <span className="font-display text-2xl font-black tracking-wider">
            M<span className="text-racing">&amp;</span>M
          </span>
          <span className="hidden border-l border-white/20 pl-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.3em] text-white/60 sm:block">
            Luxury<br />Rent a Car
          </span>
        </a>

        <ul className="hidden items-center gap-9 text-sm font-medium text-white/70 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="group relative py-2 transition hover:text-white">
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-racing transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <CurrencyToggle className="hidden md:inline-flex" />
          <a href="#rezervasyon" className="btn-neon hidden !px-5 !py-2.5 sm:inline-flex">Hemen Kirala</a>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobil menü */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-4 lg:hidden"
          >
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block border-t border-white/5 py-4 font-display text-lg uppercase tracking-wider">
                  {label}
                </a>
              </li>
            ))}
            <li className="flex justify-center border-t border-white/5 py-4">
              <CurrencyToggle />
            </li>
            <li className="pb-4">
              <a href="#rezervasyon" onClick={() => setOpen(false)} className="btn-neon w-full">Hemen Kirala</a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
