import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { QUICK_QUESTIONS, SITE, openWhatsApp } from '../config'
import WhatsAppIcon from './WhatsAppIcon'

/**
 * Sağ altta sabit WhatsApp butonu + açılan sohbet baloncuğu.
 * Hazır soruya tıklanınca: wa.me/[TELEFON_NUMARASI]?text=[SORU] açılır.
 * Numara config.js → SITE.whatsapp
 */
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const [text, setText] = useState('')
  const panelRef = useRef(null)
  const fabRef = useRef(null)
  const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })

  // Birkaç saniye sonra küçük "Merhaba" ipucu.
  // Mobilde açılış başlığını kapatmasın diye hero geçildikten sonra gösterilir.
  useEffect(() => {
    let armed = false
    const tryShow = () => {
      if (armed && (window.innerWidth >= 640 || window.scrollY > window.innerHeight * 2.2)) {
        setTeaser(true)
        window.removeEventListener('scroll', tryShow)
      }
    }
    const t = setTimeout(() => { armed = true; tryShow() }, 6000)
    window.addEventListener('scroll', tryShow, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', tryShow) }
  }, [])

  // Escape ile kapat, açılınca odak panele
  useEffect(() => {
    if (!open) return
    setTeaser(false)
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); fabRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('button')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = (msg) => openWhatsApp(msg)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="WhatsApp destek"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-3 bottom-24 top-24 z-[70] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b141a] shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] sm:inset-x-auto sm:right-6 sm:top-auto sm:max-h-[min(620px,calc(100vh-140px))] sm:w-[360px]"
          >
            {/* Başlık */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#075e54] to-[#128c7e] px-5 py-4">
              <div className="relative grid h-11 w-11 shrink-0 place-items-center whitespace-nowrap rounded-full bg-ink font-display text-[11px] font-black">
                <span>M<span className="text-racing">&amp;</span>M</span>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#128c7e] bg-[#4ade80]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">Size nasıl yardımcı olabiliriz? 👋</p>
                <p className="text-xs text-white/75">M&amp;M Luxury Rent a Car</p>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15" aria-label="Sohbeti kapat">
                <X size={20} />
              </button>
            </div>

            {/* Mesajlar + hazır sorular */}
            <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hiddenbg-[#0b141a] bg-[radial-gradient(rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:16px_16px] p-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#202c33] px-4 py-2.5 text-sm">
                Merhaba! M&amp;M Luxury Rent a Car’a hoş geldiniz. Aşağıdan bir soru seçin, WhatsApp’ta mesajınız hazır olsun.
                <span className="mt-1 block text-right text-[10px] text-white/40">{time}</span>
              </motion.div>

              <p className="px-1 pt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Hızlı sorular</p>
              <ul className="space-y-2">
                {QUICK_QUESTIONS.map((q, i) => (
                  <motion.li key={q} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.07 }}>
                    <button
                      onClick={() => send(q)}
                      className="w-full rounded-xl border border-wa/30 bg-wa/[0.06] px-4 py-3 text-left text-sm font-medium text-white/90 transition hover:translate-x-1 hover:border-wa hover:bg-wa/15"
                    >
                      {q}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Serbest mesaj */}
            <form
              onSubmit={(e) => { e.preventDefault(); if (text.trim()) { send(text.trim()); setText('') } }}
              className="flex gap-2 border-t border-white/5 bg-[#1f2c33] p-3"
            >
              <label htmlFor="wa-text" className="sr-only">Mesajınız</label>
              <input id="wa-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Mesaj yazın…"
                className="min-w-0 flex-1 rounded-full bg-[#2a3942] px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-wa" />
              <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa text-ink" aria-label="WhatsApp'ta gönder">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* İpucu balonu */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[104px] right-5 z-[70] max-w-[230px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-2xl sm:right-6"
          >
            Merhaba 👋 Size nasıl yardımcı olabiliriz?
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sabit buton */}
      <button
        ref={fabRef}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'WhatsApp sohbetini kapat' : `WhatsApp ile yazın: ${SITE.whatsappLabel}`}
        aria-expanded={open}
        className={`fixed bottom-6 right-5 z-[70] grid h-16 w-16 place-items-center rounded-full bg-wa text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,.75)] transition-transform hover:scale-110 sm:right-6 ${open ? '' : 'wa-pulse'}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={28} /></motion.span>
          ) : (
            <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><WhatsAppIcon className="h-8 w-8" /></motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-racing text-[10px] font-bold">1</span>
        )}
      </button>
    </>
  )
}
