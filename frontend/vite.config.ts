import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      //allows hot reloading within the container
      usePolling: true,
    },
    host: '0.0.0.0', //to allow dockerized vite to run in the browser
    port: 5173,
  },
});
