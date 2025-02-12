import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/Assets.js", // ✅ Entry file for the library
      name: "TaleemAssets",   // ✅ Library name
      fileName: (format) => `taleem-assets.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          howler: "Howler", // ✅ Ensure Howler is treated as an external global
        },
      },
    },
  },
});

