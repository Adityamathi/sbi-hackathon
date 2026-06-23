import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'SBI Sahaayak',
        short_name: 'SBI Sahaayak',
        description: 'Multilingual AI Banking Assistant',
        theme_color: '#005BAC',
        background_color: '#F5F9FF',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    proxy: { '/api': 'http://localhost:8000' },
  },
  build: {
    outDir: '../backend/static',
  },
})
