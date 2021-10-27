import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  base: "/src/",
  build: {
    outDir: "./build",
  },
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
