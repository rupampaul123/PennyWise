import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // <-- missing import
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})
