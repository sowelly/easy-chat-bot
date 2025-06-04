/// <reference types="vite/client" />
interface uploadInfo {
  success: boolean,
  msg: string
}

export type RemoveListener = () => void;

export interface IMainListener {
  env
  onUpload: (callback: (info: uploadInfo) => void) => RemoveListener;
}

interface ResultInfo {
  success: boolean,
  data?: any,
  msg?: string
}

interface UploadResultInfo extends ResultInfo {
  data: {
    fileId: string
  }
}

export interface IMainAPI {
  get: (key: string) => string
  uploadFile: (filename: string, content: any) => UploadResultInfo
  getUploadFiles: () => { data: { name: string }[], success: boolean }
  getKnowledgeBaseRelationship: () => ResultInfo
  deleteKnowledgeBaseRelationship: () => ResultInfo
  onSaveResult: (callback: any) => void
  createKnowledgeBase: (data: { name: string, description: string, files: string[] }) => ResultInfo
  env: {
    API_KEY: string
  }
}

export declare global {
  interface Window {
    mainAPI: IMainAPI
    mainListener: IMainListener
  }
}