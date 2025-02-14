import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Vite runs from project root
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "src/Assets.js", // Your entry point
      name: "TaleemAssets",
      fileName: "taleem-assets",
      formats: ["es"] // Builds for both ES Modules and UMD
    },
    rollupOptions: {
      // If needed, mark SSR-incompatible dependencies as external
      external: []
    }
  }
  // Note: Since this is a browser-only library, ensure it is imported only in client-side code.
});
