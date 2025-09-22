import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ⚠️ Necesario para el alias

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true, // Exclude sources for deps
      },
    },
  },
  server: {
    sourcemapIgnoreList: () => true, // Ignore source maps for dependencies in dev
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ apunta a src
    },
  },
});
