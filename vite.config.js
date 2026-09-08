import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/Student-community-website/',
  plugins: [
    react(),
    {
      name: 'admin-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          if (
            url === '/admin' ||
            url.startsWith('/admin?') ||
            url.startsWith('/admin/') ||
            url === '/stc-admin' ||
            url.startsWith('/stc-admin/') ||
            url === '/STC-Admin' ||
            url.startsWith('/STC-Admin/')
          ) {
            req.url = '/STC-Admin/index.html';
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'STC-Admin/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
    },
  },
});

