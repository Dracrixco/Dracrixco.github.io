import { defineConfig } from "vite";
import path from "path";

import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Asegura rutas relativas
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: "iife", // Genera un script compatible con navegadores sin "module"
      },
    },
  },
});
