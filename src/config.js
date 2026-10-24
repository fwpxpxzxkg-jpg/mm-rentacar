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
  facebook: 'https://facebook.com/'
}

// ---------------------------------------------------------------------
//  PARA BİRİMİ
//  Fiyatlar EURO olarak girilir; Dinar karşılığı kurla hesaplanır.
//  [KUR] → 1 € kaç denar (Makedon dinarı euroya sabit, ~61.5)
// ---------------------------------------------------------------------
export const RATES = { EUR: 1, MKD: 61.5 }

/** Euro fiyatı seçili para biriminde yazar: €350 / 21.500 ден */
export const formatPrice = (eur, cur = 'EUR') => {
  if (cur === 'MKD') {
    const mkd = Math.round((eur * RATES.MKD) / 100) * 100 // 100 denara yuvarla
    return mkd.toLocaleString('tr-TR') + ' ден'
  }
  return '€' + eur.toLocaleString('tr-TR')
}

/** WhatsApp mesajları için iki para birimi birlikte: €350 (21.500 ден) */
export const formatBoth = (eur) => `${formatPrice(eur, 'EUR')} (${formatPrice(eur, 'MKD')})`

/** WhatsApp sohbet linki: wa.me/NUMARA?text=MESAJ */
export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

/** Linki yeni sekmede açar (mobilde WhatsApp uygulaması açılır) */
export const openWhatsApp = (text) => window.open(waLink(text), '_blank', 'noopener')

// ---------------------------------------------------------------------
//  ARAÇ FİLOSU
//  NOT: Fiyatlar GEÇİCİ / ÖRNEK fiyatlardır (EURO / gün), müşteri onayıyla güncellenecek.
//  shape: fotoğraf yoksa gösterilen çizimin gövde tipi → 'super' | 'coupe' | 'sedan' | 'suv'
//  image: public/cars/ içindeki fotoğraf. Müşterinin kendi araç fotoğrafları gelince
//         aynı isimle değiştirin ve `credit` satırını silin.
//  credit: Wikimedia Commons fotoğraflarının lisansı (CC BY-SA 4.0) fotoğrafçı adının
//          gösterilmesini şart koşar; kartta küçük yazıyla görünür.
// ---------------------------------------------------------------------
const CC = 'https://creativecommons.org/licenses/by-sa/4.0/'
export const CARS = [
  { id: 'ferrari',  brand: 'Ferrari',     model: '488 GTB',        price: 350, shape: 'super', color: '#e10600', hp: 670, acc: '3.0', seats: 2, gear: 'Otomatik',
    image: 'cars/ferrari.jpg',     credit: { by: 'Alexander Migl', url: 'https://commons.wikimedia.org/wiki/File:Ferrari_488_GTB_IMG_4120_(bearb_Sp).jpg', license: CC } },
  { id: 'lambo',    brand: 'Lamborghini', model: 'Huracán EVO',    price: 320, shape: 'super', color: '#f5b400', hp: 640, acc: '2.9', seats: 2, gear: 'Otomatik',
    image: 'cars/lamborghini.jpg', credit: { by: 'Alexander Migl', url: 'https://commons.wikimedia.org/wiki/File:Lamborghini_Huracan_Evo_IMG_3679.jpg', license: CC } },
  { id: 'porsche',  brand: 'Porsche',     model: '911 Carrera S',  price: 220, shape: 'coupe', color: '#c9ccd1', hp: 450, acc: '3.5', seats: 4, gear: 'Otomatik',
    image: 'cars/porsche.jpg',     credit: { by: 'Alexander Migl', url: 'https://commons.wikimedia.org/wiki/File:Porsche_992_Carrera_S_coupe_IMG_5832.jpg', license: CC } },
  { id: 'rover',    brand: 'Range Rover', model: 'Sport',          price: 180, shape: 'suv',   color: '#3a4a3f', hp: 400, acc: '5.9', seats: 5, gear: 'Otomatik',
    image: 'cars/range-rover.jpg', credit: { by: 'Damian B Oh', url: 'https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Sport_L461_Varesine_Blue_(11).jpg', license: CC } },
  { id: 'mercedes', brand: 'Mercedes',    model: 'E-Serisi AMG Line', price: 120, shape: 'sedan', color: '#1d1f24', hp: 258, acc: '6.2', seats: 5, gear: 'Otomatik',
    image: 'cars/mercedes.jpg',    credit: { by: 'Alexander Migl', url: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_W214_1X7A0885.jpg', license: CC } },
  { id: 'bmw',      brand: 'BMW',         model: 'M4 Competition', price: 150, shape: 'coupe', color: '#1f4fd1', hp: 510, acc: '3.9', seats: 4, gear: 'Otomatik',
    image: 'cars/bmw.jpg',         credit: { by: 'Alexander Migl', url: 'https://commons.wikimedia.org/wiki/File:BMW_M4_(G82)_Competition_1X7A6103.jpg', license: CC } }
]

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
