import {config} from "dotenv";
import {BrowserWindow, app} from "electron";
import path from 'node:path';
import {fileURLToPath} from "url";
import './ipc'

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(__filename)
const mode = process.env.NODE_ENV || 'development'
const configPath = path.resolve(ROOT, `../.env.${mode}`)
const res = config({path: configPath})

console.log('ROOT', ROOT)

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(ROOT, '/main.preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });
  win.webContents.send('env', {
    "API_KEY": res.parsed?.SILICONFLOW_API_KEY,
    "BASE_URL": res.parsed?.BASE_URL
  })
  win.once('ready-to-show', () => {
    console.log('ready-to-show')
    win.show()
    win.webContents.openDevTools();

  })

  if (mode === 'development') {
    win.loadURL('http://localhost:5174');
  } else {
    win.loadFile(path.join(ROOT, '/renderer/index.html'));
  }
}

app.whenReady().then(createWindow);