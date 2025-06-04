import {defineConfig} from "vite";
import path from "path";
import {fileURLToPath} from "node:url";
import {builtinModules} from "node:module";

const __filename = fileURLToPath(import.meta.url)
const ROOT = path.dirname(__filename)

const NODE_VERSION = 22
const EXTERNAL = builtinModules.map(bm => `node:${bm}`).concat(builtinModules).concat("electron", "electron/main", "electron/common", "electron/renderer")
export default defineConfig({
  build: {
    target: `node${NODE_VERSION}`,
    outDir: path.join(ROOT, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "main": path.join(ROOT, '/electron/main/index.ts')
      },
      output: {
        format: "es",
        entryFileNames: "[name].mjs"
      },
      external: EXTERNAL
    }

  }
})
