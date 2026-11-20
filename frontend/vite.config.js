import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^plotly\.js\/dist\/plotly$/,
        replacement: 'plotly.js-dist-min/plotly.min.js',
      },
      {
        find: /^plotly\.js$/,
        replacement: 'plotly.js-dist-min/plotly.min.js',
      },
    ],
  },
  optimizeDeps: {
    include: ['plotly.js-dist-min'],
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          quantum: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
