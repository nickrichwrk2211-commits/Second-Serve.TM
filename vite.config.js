import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";

const staticAssets = ["script.js", "router-bootstrap.js", "404.html"];

function copyRuntimeAssets() {
  return {
    name: "copy-secondserve-runtime-assets",
    apply: "build",
    async generateBundle() {
      for (const fileName of staticAssets) {
        this.emitFile({
          type: "asset",
          fileName,
          source: await readFile(new URL(fileName, import.meta.url)),
        });
      }
    },
  };
}

export default defineConfig({
  base: "/Second-Serve-BBS/",
  publicDir: false,
  plugins: [copyRuntimeAssets()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
