

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [react()],
    // When in development, proxy API requests to local backend
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    // No need to manually define environment variables
    // Vite automatically handles env files with the VITE_ prefix
  }
});