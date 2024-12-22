import { defineConfig } from "vite";
import path from "path";

import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./Dracrixco.github.io",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
});
