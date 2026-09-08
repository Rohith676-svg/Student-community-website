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
          const rawUrl = req.url || '';
          const pathname = rawUrl.split('?')[0];

          if (
            pathname === '/admin' ||
            pathname === '/admin/' ||
            pathname === '/stc-admin' ||
            pathname === '/stc-admin/' ||
            pathname === '/STC-Admin' ||
            pathname === '/STC-Admin/' ||
            pathname === '/Student-community-website/admin' ||
            pathname === '/Student-community-website/admin/' ||
            pathname === '/Student-community-website/stc-admin' ||
            pathname === '/Student-community-website/stc-admin/' ||
            pathname === '/Student-community-website/STC-Admin'
          ) {
            res.writeHead(302, { Location: '/Student-community-website/STC-Admin/' });
            res.end();
            return;
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

