/*eslint-env node*/
// @ts-check
import { readFileSync } from "node:fs";
import path from "node:path";
import packageJson from "../package.json" with { type: "json" };

const { version } = packageJson;
const arch = process.arch;
const releaseDir = path.resolve(import.meta.dirname, `../release/${version}`);

function getBlob(fileName, type = "application/octet-stream") {
  const filePath = path.resolve(releaseDir, fileName);
  const file = readFileSync(filePath);
  return new File([file], fileName, { type });
}

function colorize(text, colorCode) {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
}

const BASE_URL = "http://192.168.39.105:8080";

/**
 * @returns {Promise<string>}
 */
function login() {
  return fetch(`${BASE_URL}/login`, {
    body: JSON.stringify({
      username: "xly",
      password: "admin123",
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      return data.data.token;
    });
}

function readReleaseNotes(){
  const filePath = path.resolve(import.meta.dirname, "../build/release-notes.md");
  const notes = readFileSync(filePath, {encoding: "utf-8"});
  console.log('release-notes.md', notes);
  return notes
}

async function upload() {
  // const token = await login();
  // console.log("token", token);
  const formData = new FormData();
  formData.append("version", version);
  formData.append("content", readReleaseNotes());
  if (process.platform === "win32") {
    // release/latest.yml
    const ymlFile = getBlob("latest.yml", "text/yaml");
    formData.append("files", ymlFile);
    // moebius-0.0.8-win-x64.exe
    const exeFile = getBlob(`moebius-${version}-win-${arch}.exe`, "application/x-msdownload");
    formData.append("files", exeFile);
    // moebius-0.0.8-win-x64.exe.blockmap
    const bmpFile = getBlob(`moebius-${version}-win-${arch}.exe.blockmap`, "application/octet-stream");
    formData.append("files", bmpFile);
  } else {
    throw new Error("不支持的操作系统");
  }
  const response = await fetch(`${BASE_URL}/software/Moebius/upload`, {
  // const response = await fetch(`http://localhost:8080/generic/upload`, {
    method: "POST",
    body: formData,
    headers: {
      // "Content-Type": "multipart/form-data", multipart/form-data; boundary=----formdata-undici-046435158545
      // Authorization: token,
    },
  });
  const data = await response.text();
  console.log(data);
  if (response.ok) {
    console.log(colorize("文件上传成功", 36));
  } else {
    console.log(colorize("文件上传失败", 91));
  }
}

upload();
