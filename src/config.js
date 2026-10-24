// =====================================================================
//  SİTE AYARLARI
//  İletişim bilgileri, fiyatlar ve metinler buradan yönetilir.
//  Köşeli parantezli etiketler ([TELEFON_NUMARASI], [ADRES] ...) müşteriden
//  gelecek bilgiyle değiştirilmesi gereken yerleri gösterir.
// =====================================================================

export const SITE = {
  brand: 'M&M',
  tagline: 'Luxury Rent a Car',

  // [TELEFON_NUMARASI] → WhatsApp numarası, ülke kodlu, "+" ve boşluk OLMADAN.
  // Afişteki WhatsApp numarası: +389 78 510 873
  whatsapp: '38978510873',
  whatsappLabel: '+389 78 510 873',

  // Arama için telefon (afişteki 2. numara)
  phone: '+905304974850',
  phoneLabel: '+90 530 497 4850',

  // [ADRES] → ofisin tam adresi
  address: 'Üsküp, Kuzey Makedonya',
  // [HARITA_LINKI] → Google Maps'te ofisi açıp "Paylaş" linkini buraya yapıştırın
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Skopje%2C+North+Macedonia',

  // [CALISMA_SAATLERI]
  hours: [
    ['Pazartesi – Cumartesi', '08:00 – 22:00'],
    ['Pazar', '10:00 – 20:00']
  ],

  // [SOSYAL_MEDYA] → hesap linkleri
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',

  currency: '₺'
}

/** WhatsApp sohbet linki: wa.me/NUMARA?text=MESAJ */
export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

/** Linki yeni sekmede açar (mobilde WhatsApp uygulaması açılır) */
export const openWhatsApp = (text) => window.open(waLink(text), '_blank', 'noopener')

// ---------------------------------------------------------------------
//  ARAÇ FİLOSU
//  NOT: Fiyatlar GEÇİCİ / ÖRNEK fiyatlardır, müşteri onayıyla güncellenecek.
//  shape: kart çizimindeki gövde tipi → 'super' | 'coupe' | 'sedan' | 'suv'
//  image: gerçek araç fotoğrafı eklenince yolunu yazın (örn. 'cars/ferrari.jpg',
//         dosyayı public/cars/ içine koyun). Boşsa çizim gösterilir.
// ---------------------------------------------------------------------
export const CARS = [
  { id: 'ferrari',  brand: 'Ferrari',     model: '488 GTB',        price: 12500, shape: 'super', color: '#e10600', hp: 670, acc: '3.0', seats: 2, gear: 'Otomatik', image: '' },
  { id: 'lambo',    brand: 'Lamborghini', model: 'Huracán EVO',    price: 11000, shape: 'super', color: '#f5b400', hp: 640, acc: '2.9', seats: 2, gear: 'Otomatik', image: '' },
  { id: 'porsche',  brand: 'Porsche',     model: '911 Carrera S',  price: 8500,  shape: 'coupe', color: '#c9ccd1', hp: 450, acc: '3.5', seats: 4, gear: 'Otomatik', image: '' },
  { id: 'rover',    brand: 'Range Rover', model: 'Sport HSE',      price: 7000,  shape: 'suv',   color: '#3a4a3f', hp: 400, acc: '5.9', seats: 5, gear: 'Otomatik', image: '' },
  { id: 'mercedes', brand: 'Mercedes',    model: 'E 300 AMG Line', price: 6000,  shape: 'sedan', color: '#1d1f24', hp: 258, acc: '6.2', seats: 5, gear: 'Otomatik', image: '' },
  { id: 'bmw',      brand: 'BMW',         model: 'M4 Competition', price: 5500,  shape: 'coupe', color: '#1f4fd1', hp: 510, acc: '3.9', seats: 4, gear: 'Otomatik', image: '' }
]

export const formatPrice = (n) => n.toLocaleString('tr-TR') + SITE.currency

// ---------------------------------------------------------------------
//  WHATSAPP BALONCUĞU — hazır sorular
// ---------------------------------------------------------------------
export const QUICK_QUESTIONS = [
  'Araç fiyatları hakkında bilgi almak istiyorum',
  'Rezervasyon yapmak istiyorum',
  'Araçlarınız hangi modelleri içeriyor?',
  'Teslimat ve teslim alma nasıl oluyor?',
  'Sigorta ve depozito şartları nedir?'
]

// ---------------------------------------------------------------------
//  MÜŞTERİ YORUMLARI
//  [YORUMLAR] → ÖRNEK metinlerdir. Yayından önce gerçek müşteri
//  yorumlarıyla değiştirin (Google / Instagram yorumları vb.).
// ---------------------------------------------------------------------
export const REVIEWS = [
  { name: 'Emre K.', city: 'İstanbul', car: 'Ferrari 488 GTB', stars: 5, text: 'Havalimanında araç hazır bekliyordu. Ohri yolunda hayatımın sürüşünü yaptım, her şey çok profesyoneldi.' },
  { name: 'Selin A.', city: 'Bursa', car: 'Range Rover Sport', stars: 5, text: 'Aileyle 5 gün kullandık. Araç sıfır gibiydi, WhatsApp’tan her sorumuza dakikalar içinde dönüş yaptılar.' },
  { name: 'Burak T.', city: 'Üsküp', car: 'Porsche 911', stars: 5, text: 'Düğün günümüz için kiraladık. Teslimat tam saatinde, araç tertemiz. Kesinlikle tekrar tercih ederiz.' }
]
