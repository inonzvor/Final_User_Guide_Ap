import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // The app imports ../src (the Model/ViewModel library) from outside app/'s own root.
    fs: { allow: ['..'] },
  },
});
