import path from "path";
import fs from "fs/promises";
import { validateData } from "./utils/validateData.js";

const pathFolder = path.resolve("files");

export async function createFile(fileName, content) {
  const file = { fileName, content };

  const { error } = validateData(file);

  if (error) {
    console.log(`Please specify ${error.details[0].path[0]} param`);
  }
  const filePath = path.resolve("files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("file created successfully");
  } catch (error) {
    console.log(error);
  }
}

export async function getFiles() {
  const dir = await fs.readdir(pathFolder);
  if (dir.length === 0) {
    console.log("Folder is empty!");
  } else {
    dir.forEach((file) => console.log(file));
  }
}

export async function getFileContent(fileName) {
  try {
    const dir = await fs.readdir(pathFolder);
    if (!dir.includes(fileName)) {
      console.log("File is not found");
    } else {
      const filePath = path.resolve("files", fileName);
      const content = await fs.readFile(filePath, "utf-8");
      console.log(content);
    }
  } catch (error) {
    console.log(error);
  }
}