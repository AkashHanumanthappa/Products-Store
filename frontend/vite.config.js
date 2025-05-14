import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // The backend server URL
        changeOrigin: true,  // To ensure the origin of the request is modified correctly
        secure: false, // If you're using HTTP instead of HTTPS
        ws: true, // Enable WebSocket proxying if needed
      },
    },
  },
};
