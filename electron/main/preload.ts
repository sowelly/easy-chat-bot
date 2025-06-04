import {contextBridge, ipcRenderer} from 'electron'
import {getKnowledgeBaseRelationship} from "../tools";

let env = {}

interface uploadInfo {
  success: boolean,
  msg: string
}

function addListener(channel, callback: (...args: any[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: any[]) => callback(...args)
  ipcRenderer.on(channel, callback)
  return () => ipcRenderer.off(channel, listener)
}

contextBridge.exposeInMainWorld('mainAPI', {
  get: (key) => env[key],
  uploadFile: (filename, content) => ipcRenderer.invoke('UPLOAD_FILE', filename, content),
  getUploadFiles: () => ipcRenderer.invoke('GET_UPLOAD_FILES'),
  getKnowledgeBaseRelationship: () => ipcRenderer.invoke('GET_KNOWLEDGE_BASE_RELATIONSHIP'),
  deleteKnowledgeBaseRelationship: (r) => ipcRenderer.invoke('DELETE_KNOWLEDGE_BASE_RELATIONSHIP',r),
  createKnowledgeBase: (data) => ipcRenderer.invoke('CREATE_KNOWLEDGE_BASE',data),
})


contextBridge.exposeInMainWorld('mainListener', {
  env: (event, data) => addListener('env', () => env = data),
  onUpload: (callback: (info: uploadInfo) => void) => addListener('upload-result', callback)
})


window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload loaded');

});
