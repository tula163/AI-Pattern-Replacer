import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // 这里不要用 path.resolve(__dirname, 'src')
    },
  },
  server: {
    port: 5173,  // 前端端口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // 后端地址
        changeOrigin: true,
      },
      '/media': {
        target: 'http://localhost:8000',  // Django 端口
        changeOrigin: true,
      },
    },
  },
});
