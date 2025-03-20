import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'window', // Cung cấp global cho trình duyệt
  },
  resolve: {
    alias: {
      buffer: resolve(__dirname, 'node_modules', 'buffer'), // Đảm bảo rằng buffer được giải quyết đúng
    },
  },
  optimizeDeps: {
    include: ['buffer'], // Đảm bảo buffer được tối ưu hóa
  },
});
