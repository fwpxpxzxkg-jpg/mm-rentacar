import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Göreli yollar: site GitHub Pages alt klasöründe, Netlify'da veya kendi alan adında aynen çalışır
  base: './',
  server: { port: 5179 },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // 3D kütüphaneleri ayrı dosyaya: sayfa önce açılır, 3D sonra yüklenir
        manualChunks: { three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'] }
      }
    }
  }
})
