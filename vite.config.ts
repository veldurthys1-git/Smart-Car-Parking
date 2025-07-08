import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Smart-Car-Parking/', // Name of your GitHub repo
  plugins: [react()],
})