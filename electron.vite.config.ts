import { defineConfig } from "vite";
import { builtinModules } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const ROOT = path.dirname(__filename);

const NODE_VERSION = 22;
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat("electron", "electron/main", "electron/common", "electron/renderer");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    conditions: ["import", "require"], // ws node 环境导入浏览器js
  },
  build: {
    target: `node${NODE_VERSION}`,
    outDir: path.join(ROOT, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.join(ROOT, "electron/main/preload.ts"),
        preload: path.join(ROOT, "electron/preload/preload.ts"),
      },
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
      external: EXTERNAL,
    },
  },
});
