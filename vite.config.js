import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 12000,
    strictPort: true,
    cors: true,
    allowedHosts: ['work-1-amdljeyccsunazqf.prod-runtime.all-hands.dev'],
    headers: {
      'X-Frame-Options': 'ALLOWALL',
    },
  },
});
