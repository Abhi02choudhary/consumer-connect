import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
        "/chat": {
            target: "http://localhost:8080, http://localhost:5173",
            changeOrigin: true,
            secure: false
        }
    }
}
})