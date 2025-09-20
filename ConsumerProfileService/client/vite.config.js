import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@chat-service": path.resolve(__dirname, "node_modules/consumer-chat-service/client/src"),
    }, 
  },
  server: {
    fs: {
      allow: ['C:/Users/dhruv/Desktop/ConsumerConnect/ConsumerProfileService/client']
    },
    proxy: {
        "/chat": {
            target: "http://localhost:8080, http://localhost:5173",
            changeOrigin: true,
            secure: false
        }
    }
}
})