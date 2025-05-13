import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all interfaces
    port: 5173,       // Specify the port
    strictPort: true, // Don't try another port if 5173 is taken
    watch: {
      usePolling: true // Better compatibility inside Docker
    }
  }
})
