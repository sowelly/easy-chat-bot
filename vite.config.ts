import {fileURLToPath} from "node:url";
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from '@tailwindcss/vite'

const CHROME_VERSION = 134;

const __filename = fileURLToPath(import.meta.url)
const ROOT = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  root: path.join(ROOT, 'src'),
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: path.join(ROOT, 'src/public'),
  build: {
    target: `chrome${CHROME_VERSION}`,
    outDir: path.join(ROOT, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(ROOT, 'src/index.html')
      }
    }
  },
  server: {
    // proxy: {}

  }


})
