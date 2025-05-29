import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080, // 👈 sets dev server port
  },
  plugins: [react()],
})
