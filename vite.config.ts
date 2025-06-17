import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  build: {
    outDir: 'dist', // Standard Vite output directory
  },
  server: {
    port: 3000, // Keep the same port as CRA
  },
})
