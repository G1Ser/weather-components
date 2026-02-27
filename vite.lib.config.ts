import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    dts({
      include: ["src/components/**/*"],
      outDir: "lib",
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    outDir: "lib",
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/components/index.ts"),
      name: "G1Components",
      formats: ["es", "umd"],
      fileName: (format) => `g1-components.${format}.js`,
    },
  },
});
