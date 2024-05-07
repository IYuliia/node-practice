import { program } from "commander";
import { createFile, getFiles, getFileInfo } from "./files.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-f, --fileName <type>", "fileName")
  .option("-c, --content <type>", "content");

program.parse();

const options = program.opts();

async function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;

    case "getAll":
      getFiles();
      break;

    case "getContent":
      getFileInfo(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);