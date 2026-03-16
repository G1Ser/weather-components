import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const r = (p: string) => path.resolve(__dirname, p);

const components = ["skeleton", "svgIcon", "toast", "introScroll"] as const;

const vendorChunks: Record<string, string[]> = {
  three: ["three"],
  lit: ["lit"],
};

function buildEntries() {
  const componentEntries = Object.fromEntries(
    components.map((name) => [
      `${name}/index`,
      r(`src/components/${name}/index.ts`),
    ]),
  );
  return {
    index: r("src/components/index.ts"),
    ...componentEntries,
  };
}

function splitVendorChunks(id: string): string | undefined {
  for (const [chunk, pkgs] of Object.entries(vendorChunks)) {
    if (pkgs.some((pkg) => id.includes(`node_modules/${pkg}`))) return chunk;
  }
}

export default defineConfig({
  resolve: {
    alias: { "@": r("src") },
  },
  plugins: [
    dts({
      include: ["src/components/**/*"],
      outDir: "lib",
      entryRoot: "src/components",
      rollupTypes: false,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  build: {
    outDir: "lib",
    copyPublicDir: false,
    lib: {
      entry: buildEntries(),
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        manualChunks: splitVendorChunks,
      },
    },
  },
});
