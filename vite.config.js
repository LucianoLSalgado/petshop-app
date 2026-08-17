import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Define que '@' aponta para a pasta 'src'
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});