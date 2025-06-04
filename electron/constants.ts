import {fileURLToPath} from "node:url";
import path from "path";

const fileDir = fileURLToPath(import.meta.url)
export const ROOT = path.dirname(fileDir)

export const downloadFileDir = path.join(ROOT, '../bin/download')
export const knowledgeBaseRelation = path.join(ROOT, '../bin/knowledgeBase')