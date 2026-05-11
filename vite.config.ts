import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // Rutas absolutas desde la raíz del dominio.
  // CRÍTICO para SPAs con sub-rutas: con base './' (relativo), una página en
  // /servicios/redes-informaticas buscaría los assets en /servicios/assets/...
  // y devolvería 422. Con '/' siempre carga desde /assets/... que SÍ existe.
  base: '/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
