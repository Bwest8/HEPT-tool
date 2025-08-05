import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
// Trigger new deployment
export default defineConfig({
  plugins: [react()],
  base: '/HEPT-tool/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})