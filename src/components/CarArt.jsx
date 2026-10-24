/**
 * Araç fotoğrafı yokken gösterilen stilize yan profil çizimi.
 * config.js içinde araca `image` verildiğinde Fleet bileşeni fotoğrafı gösterir.
 */
const SHAPES = {
  super: {
    body: 'M18 122 L24 106 Q52 94 112 88 L168 64 Q196 52 236 54 L282 60 Q322 72 352 92 L380 100 Q394 106 392 122 Z',
    win: 'M176 66 Q200 58 234 59 L262 62 L246 84 L150 88 Z',
    wheels: [96, 310], r: 24
  },
  coupe: {
    body: 'M18 122 Q20 104 48 98 L108 92 Q148 52 206 50 Q258 52 300 84 L360 96 Q390 102 388 122 Z',
    win: 'M126 90 Q156 60 204 58 Q236 60 262 84 Z',
    wheels: [94, 308], r: 25
  },
  sedan: {
    body: 'M14 122 Q14 104 40 100 L110 92 L150 62 Q172 54 222 54 L262 56 Q284 60 304 88 L364 96 Q390 102 388 122 Z',
    win: 'M126 92 L158 64 Q176 60 220 60 L256 62 Q272 66 290 90 Z',
    wheels: [92, 310], r: 25
  },
  suv: {
    body: 'M18 124 L20 88 Q24 74 44 72 L104 70 L132 40 Q138 32 152 32 L300 32 Q318 32 326 46 L348 74 L374 82 Q390 88 388 124 Z',
    win: 'M118 72 L142 42 Q146 38 156 38 L296 38 Q310 38 316 48 L332 72 Z',
    wheels: [96, 306], r: 28
  }
}

export default function CarArt({ shape = 'super', color = '#e10600', id }) {
  const s = SHAPES[shape]
  const gid = `g-${id}`
  return (
    <svg viewBox="0 0 400 160" className="w-full" role="img" aria-label="Araç çizimi">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".35" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor="#000" stopOpacity=".85" />
        </linearGradient>
        <radialGradient id={gid + 'r'}>
          <stop offset="0" stopColor="#555" />
          <stop offset="1" stopColor="#111" />
        </radialGradient>
      </defs>
      {/* zemin parlaması */}
      <ellipse cx="200" cy="146" rx="180" ry="8" fill={color} opacity=".35" style={{ filter: 'blur(6px)' }} />
      <ellipse cx="200" cy="146" rx="170" ry="4" fill="#000" opacity=".8" />
      {/* gövde */}
      <path d={s.body} fill={color} />
      <path d={s.body} fill={`url(#${gid})`} />
      <path d={s.win} fill="#0b0d10" opacity=".9" />
      <path d={s.win} fill="none" stroke="#ffffff" strokeOpacity=".25" strokeWidth="1.2" />
      {/* farlar */}
      <rect x="372" y="102" width="16" height="4" rx="2" fill="#fff" style={{ filter: 'drop-shadow(0 0 6px #fff)' }} />
      <rect x="18" y="106" width="12" height="4" rx="2" fill="#ff2a1f" style={{ filter: 'drop-shadow(0 0 6px #e10600)' }} />
      {/* tekerlekler */}
      {s.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy="124" r={s.r} fill="#0a0a0a" />
          <circle cx={x} cy="124" r={s.r * 0.62} fill={`url(#${gid}r)`} stroke="#9a9a9a" strokeWidth="1.5" />
          <circle cx={x} cy="124" r={s.r * 0.18} fill="#d4af37" />
        </g>
      ))}
    </svg>
  )
}
