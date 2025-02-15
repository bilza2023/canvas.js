import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Ensure Vite runs from the project root
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    minify: false, // Disable minification
    lib: {
      entry: "src/user/TaleemCanvas.js", // Your actual entry point
      name: "TaleemCanvas",
      fileName: "taleem-canvas",
      formats: ["es"], // Support only ES Modules
    }
  }
});
