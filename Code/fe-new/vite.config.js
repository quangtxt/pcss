import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  jsx: "react",
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
