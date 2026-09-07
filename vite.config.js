import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Student-community-website/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
    },
  },
});
