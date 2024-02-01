import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      
      '/api': 'http://localhost:8080',
      
      '/assets': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path:any) => {
          if (path.includes('checkout')) {
            return path.replace(/^\/checkout/, '');
          }
          return path;
        }
      },
    }
  },
})
