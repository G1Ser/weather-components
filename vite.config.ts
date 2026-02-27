import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8080,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const fileName =
            assetInfo.names?.[0] || assetInfo.originalFileNames?.[0] || "";
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(fileName)) {
            return "fonts/[name]-[hash][extname]";
          }
          if (/\.(css|scss)(\?.*)?$/i.test(fileName)) {
            return "css/[name]-[hash][extname]";
          }
          if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(fileName)) {
            return "images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
