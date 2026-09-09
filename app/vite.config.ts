import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
    // The app imports ../src (the Model/ViewModel library) from outside app/'s own root.
    fs: { allow: ['..'] },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
