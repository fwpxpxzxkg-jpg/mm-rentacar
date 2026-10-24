/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',      // ana siyah
        racing: '#e10600',   // Ferrari kırmızısı
        gold: '#d4af37',     // altın detaylar
        wa: '#25D366'        // WhatsApp yeşili
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
