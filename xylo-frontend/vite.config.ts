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
    allowedHosts: ["openhands-tool-tunnel-zwdi3ogg.devinapps.com"],
  },
  preview: {
    allowedHosts: ["openhands-tool-tunnel-x1qacw9e.devinapps.com", "openhands-tool-tunnel-zwdi3ogg.devinapps.com"],
  },
})

