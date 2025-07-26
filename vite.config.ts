import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Trigger new deployment
export default defineConfig({
  plugins: [react()],
  base: '/HEPT-tool/'
})