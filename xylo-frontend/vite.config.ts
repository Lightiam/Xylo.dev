import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {}
  },
  server: {
    host: "0.0.0.0",
    cors: true,
    hmr: {
      host: 'localhost'
    },
    strictPort: true,
    proxy: {},
    fs: {
      strict: false
    },
    origin: 'http://localhost:5173',
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
})

