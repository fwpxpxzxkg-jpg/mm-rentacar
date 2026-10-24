import { createContext, useContext, useEffect, useState } from 'react'
import { formatPrice } from './config'

/** Seçili para birimi (EUR / MKD) tüm sitede paylaşılır ve tarayıcıda hatırlanır */
const CurrencyContext = createContext({ cur: 'EUR', setCur: () => {}, fmt: (n) => formatPrice(n) })

const KEY = 'mm-currency'
const load = () => {
  try { return localStorage.getItem(KEY) === 'MKD' ? 'MKD' : 'EUR' } catch { return 'EUR' }
}

export function CurrencyProvider({ children }) {
  const [cur, setCur] = useState(load)
  useEffect(() => { try { localStorage.setItem(KEY, cur) } catch { /* gizli sekme vb. */ } }, [cur])
  return (
    <CurrencyContext.Provider value={{ cur, setCur, fmt: (eur) => formatPrice(eur, cur) }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)

/** € / ден geçiş düğmesi */
export function CurrencyToggle({ className = '' }) {
  const { cur, setCur } = useCurrency()
  return (
    <div role="group" aria-label="Para birimi" className={`inline-flex rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur ${className}`}>
      {[['EUR', '€ Euro'], ['MKD', 'ден Dinar']].map(([c, label]) => (
        <button
          key={c}
          type="button"
          onClick={() => setCur(c)}
          aria-pressed={cur === c}
          className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition ${
            cur === c ? 'bg-gold text-ink shadow-[0_0_16px_-2px_rgba(212,175,55,.7)]' : 'text-white/60 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
