import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import WhyUs from './components/WhyUs'
import Booking from './components/Booking'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

/** Mobil cihaz kontrolü — 3D sahne mobilde hafifletilir */
function useIsMobile(query = '(max-width: 768px)') {
  const [m, setM] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

export default function App() {
  const isMobile = useIsMobile()
  // Filodaki "Kirala" butonu → formda aracı seçili getirir
  const [selectedCar, setSelectedCar] = useState('')

  return (
    <>
      <a href="#filo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-racing focus:px-4 focus:py-2">
        İçeriğe geç
      </a>
      <Navbar />
      <main>
        <Hero isMobile={isMobile} />
        <Fleet onRent={(id) => { setSelectedCar(id); document.getElementById('rezervasyon')?.scrollIntoView({ behavior: 'smooth' }) }} />
        <WhyUs />
        <Booking selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
