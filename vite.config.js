import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      // Framer-exported shader files import from "framer"; exact match only,
      // so "framer-motion" is unaffected.
      { find: /^framer$/, replacement: path.resolve(__dirname, './src/lib/framer-shim.js') },
    ],
  },
})
