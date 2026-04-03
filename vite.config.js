import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/React-Assignments-New/",
  server: {
    port: 3000
  }
})