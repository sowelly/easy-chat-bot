import {app, ipcMain} from "electron/main";
import {
  createKnowledgeBase,
  deleteKnowledgeBaseRelationship,
  getFileList,
  getKnowledgeBaseRelationship,
  uploadFile
} from "../tools";

app.whenReady().then(() => {
  ipcMain.handle('UPLOAD_FILE', (_event, filename, content) => uploadFile(_event, filename, content))
  ipcMain.handle('GET_UPLOAD_FILES', () => getFileList())
  ipcMain.handle('GET_KNOWLEDGE_BASE_RELATIONSHIP', () => getKnowledgeBaseRelationship())
  ipcMain.handle('DELETE_KNOWLEDGE_BASE_RELATIONSHIP', (_event, r) => deleteKnowledgeBaseRelationship(r))
  ipcMain.handle('CREATE_KNOWLEDGE_BASE', (_event, data) => createKnowledgeBase(data))
})