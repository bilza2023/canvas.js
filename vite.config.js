import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Ensure Vite runs from the project root
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "src/user/TaleemCanvas.js", // Your actual entry point
      name: "TaleemCanvas",
      fileName: "taleem-canvas",
      formats: ["es"], // Support both ES Modules & UMD
    }
  }
});
