import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Because in development mode the frontend is at the address localhost:5173,
    // the requests to the backend go to the wrong address localhost:5173/api/notes.
    // The backend is at localhost:3001.
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
