import {fileURLToPath} from "node:url";
import path from "path";

const fileDir = fileURLToPath(import.meta.url)
export const ROOT = path.dirname(fileDir)

export const vectorDir = path.join(ROOT, '../vector-docs')
export const downloadFileDir = path.join(ROOT, '../build/bin/download')
export const knowledgeBaseRelation = path.join(ROOT, '../build/bin/knowledgeBase')