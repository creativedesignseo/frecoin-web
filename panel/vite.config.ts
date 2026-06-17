import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El panel se sirve bajo https://frecoin.es/panel/ (carpeta separada en Hostinger).
// base='/panel/' hace que los assets se referencien con ese prefijo.
export default defineConfig({
  base: '/panel/',
  plugins: [react()],
  server: { port: 5180 },
});
