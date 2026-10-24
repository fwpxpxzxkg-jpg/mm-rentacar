# M&M Luxury Rent a Car

3D Ferrari girişli, WhatsApp entegrasyonlu premium araç kiralama sitesi.

**Teknolojiler:** React 18 + Vite 5 · Tailwind CSS 3 · React Three Fiber + Drei + Postprocessing · Framer Motion · Lucide React

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5179
npm run build    # yayına hazır dosyalar dist/ klasörüne çıkar
```

## Değiştirilecek yer tutucular

Hepsi **`src/config.js`** içinde:

| Etiket | Ne yapılmalı |
|---|---|
| `[TELEFON_NUMARASI]` | `SITE.whatsapp`: ülke kodlu, `+` ve boşluk olmadan. Şu an afişteki `38978510873` |
| `[ADRES]` | `SITE.address`: ofisin tam adresi |
| `[HARITA_LINKI]` | `SITE.mapUrl`: Google Maps paylaşım linki |
| `[CALISMA_SAATLERI]` | `SITE.hours` |
| `[SOSYAL_MEDYA]` | `SITE.instagram`, `SITE.facebook` |
| `[YORUMLAR]` | `REVIEWS`: **örnek metinlerdir**, yayından önce gerçek yorumlarla değiştirin |
| Fiyatlar | `CARS[].price`: **geçici / örnek** fiyatlar |
| Araç fotoğrafı | `CARS[].image`: fotoğrafı `public/cars/` içine koyup yolunu yazın (örn. `cars/ferrari.jpg`) |

Ayrıca:
- `src/components/WhyUs.jsx`: `[AVANTAJLAR]` (sigorta, ücretsiz teslimat vb. müşteriyle teyit edilmeli)
- `index.html`: `[OG_GORSEL]` paylaşım görseli

## Dosya yapısı

```
public/models/          3D Ferrari modeli (three.js örnek modeli, Draco sıkıştırmalı) + gölge dokusu
src/config.js           Tüm iletişim bilgileri, araçlar, fiyatlar, hazır sorular, yorumlar
src/components/
  Navbar.jsx            Sticky menü (saydam → siyah), mobil menü
  Hero.jsx              Açılış ekranı, yükleme ekranı, kaydırınca açılan öne çıkan araç paneli
  HeroScene.jsx         3D sahne: dönen Ferrari, parlayan farlar, yansımalı zemin, sis, parçacıklar, bloom
  Fleet.jsx             Araç kartları (3D tilt + parlama)
  CarArt.jsx            Fotoğraf yokken gösterilen araç çizimi
  WhyUs.jsx             Neden Biz? kutuları
  Booking.jsx           Rezervasyon formu → WhatsApp mesajı
  Testimonials.jsx      Müşteri yorumları
  Footer.jsx            İletişim, saatler, sosyal medya, harita
  WhatsAppWidget.jsx    Sabit WhatsApp butonu + hazır sorulu sohbet baloncuğu
```

## Performans

- 3D sahne `React.lazy` ile ayrı dosyada yüklenir; sayfa önce açılır.
- Mobilde yansımalı zemin ve bloom kapalıdır, parçacık sayısı azaltılır, çözünürlük sınırlandırılır.
- Hero ekrandan çıkınca 3D çizim durur.

## Yayına alma

`base: './'` ayarı sayesinde `dist/` klasörü olduğu gibi GitHub Pages, Netlify (sürükle-bırak) veya herhangi bir hostinge yüklenebilir.
Draco çözücüsü `gstatic.com` CDN'inden yüklenir.

**Şu anki yayın:** https://fwpxpxzxkg-jpg.github.io/mm-rentacar/
`main` dalında kaynak kod, `gh-pages` dalında derlenmiş site durur. GitHub Pages `gh-pages` dalından yayın yapar.
Güncelleme için (PowerShell):

```powershell
npm run build
cd dist; git init -b gh-pages; git add -A; git commit -m "deploy"
git push -f https://github.com/fwpxpxzxkg-jpg/mm-rentacar.git gh-pages
cd ..; Remove-Item -Recurse -Force dist\.git
```
