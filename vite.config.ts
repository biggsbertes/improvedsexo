import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removido o lovable-tagger para produção

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path em produção. Defina VITE_BASE="/skye/" se publicar em subpasta
  base: mode === 'production' ? (process.env.VITE_BASE ?? '/') : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
