import {vectorDir, knowledgeBaseRelation} from "./constants";
import {createHash} from 'node:crypto'
import fs from "fs";
import path from "path";
import {v4 as uuidv4} from 'uuid'


const fileUuidConfig = path.join(vectorDir, '/uuid.json')


function writeJson(configPath: string, data: { [k: string]: string }) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2), "utf-8");
}

function readJson(configPath: string) {
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}


function ensureDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true})
  }
}

function getFileHash(content: any) {
  return createHash('sha256').update(content).digest('hex')
}

export async function uploadFile(_event, filename: string, content: any) {
  ensureDir(vectorDir)
  if (!fs.existsSync(fileUuidConfig)) writeJson(fileUuidConfig, {})

  const raw = readJson(fileUuidConfig)
  const fileSHA256 = getFileHash(content)
  if (Object.values(raw).includes(fileSHA256)) {
    return {success: false, msg: `文件上传失败，${filename} 已存在或内容重复`}
  }

  const updateRaw = {...raw, [filename]: fileSHA256}
  fs.writeFileSync(path.join(vectorDir, filename), content, 'utf-8')
  writeJson(fileUuidConfig, updateRaw)
  console.log('文件上传成功,fileId:', fileSHA256)

  return {success: true, msg: '文件上传成功', data: {fileId: fileSHA256}}
}


export async function getFileList() {
  ensureDir(vectorDir)
  if (!fs.existsSync(fileUuidConfig)) writeJson(fileUuidConfig, {})

  const raw = readJson(fileUuidConfig)
  return {
    data: Object.keys(raw).map(r => ({name: r})),
    success: true
  }
}


export async function getKnowledgeBaseRelationship() {
  try {
    ensureDir(knowledgeBaseRelation)
    const knowledgeBaseRelationPath = path.join(knowledgeBaseRelation, '/relation.json')
    if (!fs.existsSync(knowledgeBaseRelationPath)) {
      writeJson(knowledgeBaseRelationPath, {})
      return {
        data: []
      }
    }

    const raw = readJson(knowledgeBaseRelationPath)
    const values = Array.from(Object.values(raw))

    const fileUuidConfigRaw = Object.entries(readJson(fileUuidConfig))

    function findFileName(fileId: string): { name: string, id: string } {
      for (const [key, value] of fileUuidConfigRaw) {
        if (value === fileId) {
          return {name: key, id: value}
        }
      }
    }


    for (const r of values) {
      let files = []
      for (const f of r.files) {
        files = [...files, findFileName(f)]
      }
      r.files = files
    }
    return {
      data: values,
      success: true
    }
  } catch (e) {
    return {
      data: [],
      success: false,
      msg: e
    }
  }
}

export async function createKnowledgeBase(data) {
  try {
    ensureDir(knowledgeBaseRelation)
    const targetPath = path.join(knowledgeBaseRelation, 'relation.json')
    if (!fs.existsSync(targetPath)) writeJson(targetPath, {})

    const raw = readJson(targetPath)
    const id = uuidv4()
    const updateRaw = {
      ...raw,
      [data.name]: {...data, id}
    }
    writeJson(targetPath, updateRaw)
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false,
      msg: e
    }
  }
}

export async function deleteKnowledgeBaseRelationship(r) {
  try {
    ensureDir(knowledgeBaseRelation)
    const targetPath = path.join(knowledgeBaseRelation, 'relation.json')
    if (!fs.existsSync(targetPath)) writeJson(targetPath, {})

    const raw = readJson(targetPath)
    for (const k in raw) {
      if (r.id === raw[k].id) {
        delete raw[k]
      }
    }

    writeJson(targetPath, raw)
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false,
      msg: e
    }
  }

}