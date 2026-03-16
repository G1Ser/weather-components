import path from "node:path";
import { defineConfig } from "vite";

const vendorChunks: Record<string, string[]> = {
  "vendor-three": ["three"],
  "vendor-lit": ["lit"],
};

const assetDirs: [RegExp, string][] = [
  [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i, "fonts"],
  [/\.(css|scss)(\?.*)?$/i, "css"],
  [/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i, "images"],
];

function splitVendorChunks(id: string): string | undefined {
  for (const [chunk, pkgs] of Object.entries(vendorChunks)) {
    if (pkgs.some((pkg) => id.includes(`node_modules/${pkg}`))) return chunk;
  }
  if (id.includes("node_modules/")) return "vendor";
}

function resolveAssetDir(assetInfo: {
  names?: string[];
  originalFileNames?: string[];
}): string {
  const fileName =
    assetInfo.names?.[0] ?? assetInfo.originalFileNames?.[0] ?? "";
  const match = assetDirs.find(([re]) => re.test(fileName));
  return match
    ? `${match[1]}/[name]-[hash][extname]`
    : "assets/[name]-[hash][extname]";
}

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
        manualChunks: splitVendorChunks,
        assetFileNames: resolveAssetDir,
      },
    },
  },
});
