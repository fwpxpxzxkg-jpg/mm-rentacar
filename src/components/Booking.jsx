import { useMemo, useState } from 'react'
import { CalendarDays, Send } from 'lucide-react'
import { CARS, formatPrice, openWhatsApp } from '../config'
import Reveal, { SectionHead } from './Reveal'

const iso = (d) => d.toISOString().slice(0, 10)
const addDays = (n) => new Date(Date.now() + n * 864e5)
const trDate = (v) => new Date(v + 'T12:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

/** Rezervasyon formu → doldurulan bilgiler WhatsApp mesajına dönüşür */
export default function Booking({ selectedCar, setSelectedCar }) {
  const [form, setForm] = useState({ name: '', phone: '', from: iso(addDays(2)), to: iso(addDays(5)), note: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const car = CARS.find((c) => c.id === selectedCar)
  const days = useMemo(() => Math.max(1, Math.round((new Date(form.to) - new Date(form.from)) / 864e5) || 1), [form.from, form.to])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !car) {
      setError('Lütfen ad soyad, telefon ve araç seçimini doldurun.')
      return
    }
    if (new Date(form.to) <= new Date(form.from)) {
      setError('İade tarihi, alış tarihinden sonra olmalı.')
      return
    }
    setError('')
    const msg = [
      'Merhaba, rezervasyon talebim var:',
      '',
      `👤 Ad Soyad: ${form.name.trim()}`,
      `📞 Telefon: ${form.phone.trim()}`,
      `🚗 Araç: ${car.brand} ${car.model}`,
      `📅 Alış: ${trDate(form.from)}`,
      `📅 İade: ${trDate(form.to)} (${days} gün)`,
      `💰 Tahmini: ${formatPrice(car.price * days)}`,
      form.note.trim() ? `📝 Not: ${form.note.trim()}` : null
    ].filter((l) => l !== null).join('\n')
    openWhatsApp(msg)
  }

  return (
    <section id="rezervasyon" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-racing/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Rezervasyon"
          title={<>Anahtarın <span className="text-racing">Hazır</span></>}
          text="Formu doldurun, talebiniz WhatsApp'ta hazır mesaj olarak açılsın. Tek tıkla gönderin."
        />
        <Reveal>
          <form onSubmit={submit} noValidate className="glass grid gap-5 p-6 sm:grid-cols-2 sm:p-10" aria-describedby={error ? 'form-error' : undefined}>
            <div>
              <label htmlFor="name" className="field-label">Ad Soyad *</label>
              <input id="name" className="field" value={form.name} onChange={set('name')} placeholder="Adınız Soyadınız" autoComplete="name" required />
            </div>
            <div>
              <label htmlFor="phone" className="field-label">Telefon *</label>
              <input id="phone" type="tel" className="field" value={form.phone} onChange={set('phone')} placeholder="+90 5xx xxx xx xx" autoComplete="tel" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="car" className="field-label">Araç Seçimi *</label>
              <select id="car" className="field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} required
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
                <option value="" className="bg-ink">Araç seçin…</option>
                {CARS.map((c) => (
                  <option key={c.id} value={c.id} className="bg-ink">{c.brand} {c.model} — {formatPrice(c.price)}/gün</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="from" className="field-label">Alış Tarihi</label>
              <input id="from" type="date" className="field [color-scheme:dark]" value={form.from} min={iso(new Date())} onChange={set('from')} />
            </div>
            <div>
              <label htmlFor="to" className="field-label">İade Tarihi</label>
              <input id="to" type="date" className="field [color-scheme:dark]" value={form.to} min={form.from} onChange={set('to')} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="note" className="field-label">Not</label>
              <textarea id="note" rows={3} className="field resize-none" value={form.note} onChange={set('note')} placeholder="Teslim yeri, uçuş numarası, özel istekler…" />
            </div>

            <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-6 sm:col-span-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <CalendarDays className="text-gold" aria-hidden="true" />
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">{days} gün · tahmini tutar</div>
                  <div className="font-display text-3xl font-black" aria-live="polite">{car ? formatPrice(car.price * days) : '—'}</div>
                </div>
              </div>
              <button type="submit" className="btn-neon w-full !bg-wa !py-4 sm:w-auto" style={{ boxShadow: '0 10px 30px -8px rgba(37,211,102,.7)' }}>
                <Send size={18} aria-hidden="true" /> WhatsApp ile Gönder
              </button>
            </div>
            {error && <p id="form-error" role="alert" className="text-sm font-semibold text-racing sm:col-span-2">{error}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
