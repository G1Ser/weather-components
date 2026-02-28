import path from "node:path";
import fs from "node:fs";
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
    {
      name: "format-dts",
      apply: "build",
      closeBundle() {
        const oldPath = path.resolve(__dirname, "lib/index.d.ts");
        const newPath = path.resolve(__dirname, "lib/g1-components.es.d.ts");
        if (fs.existsSync(oldPath)) {
          const content = fs.readFileSync(oldPath, "utf-8");
          const append = fs.readFileSync(
            path.resolve(__dirname, "scripts/custom-elements.d.ts.tpl"),
            "utf-8",
          );
          fs.writeFileSync(newPath, content + "\n" + append);
          fs.unlinkSync(oldPath);
        }
      },
    },
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
