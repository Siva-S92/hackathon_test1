import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // TO USE OUR EXPRESS-BACKEND
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://hackathon-test1-backend.vercel.app',  // http://localhost:5000 URL of your Express backend
  //       changeOrigin: true,             // Change the origin of the host header to match the target
  //       secure: false,                  // Use only if the backend uses HTTPS
  //     },
  //   },
  // },


  // YOU CAN MAKE LIVE THE CONFIGURATIONS GIVEN BELOW, IF YOU DON'T WANT TO USE OUR EXPRESS- BACKEND
  
  // server: {
  //   proxy: {
  //     '/api/add-product': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/add-product/, 'https://eureka.innotrat.in/product'),
  //     },
  //     '/api/check-running': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/check-running/, 'https://eureka.innotrat.in/devices/running'),
  //     },
  //     '/api/getproductdefinition': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/getproductdefinition/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition'),
  //     },
  //     '/api/new-productdefinition': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/new-productdefinition/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition'),
  //     },
  //     '/api/update-productdefinition': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/update-productdefinition/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/components'),
  //     },
  //     '/api/delete-productdefinition': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/delete-productdefinition/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/definition'),
  //     },
  //     '/api/start-device': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/start-device/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/devices/control'),
  //     },
  //     '/api/stop-device': {
  //       target: 'https://eureka.innotrat.in',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/stop-device/, 'https://eureka.innotrat.in/product/61630893-6873-456c-bc38-b9d7eb7bcedb/devices/control'),
  //     },
  //   },
  // },
});

