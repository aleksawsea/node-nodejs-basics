import { rename as renameFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const existingFile = path.join(__dirname, 'files', 'wrongFilename.txt');
const renamedFile = path.join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
  try {
    await access(existingFile);
  } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error('FS operation failed');
      }
  }

  try {
    await access(renamedFile);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
    }
  }

  try {
    await renameFile(existingFile, renamedFile);
  } catch (err) {
    console.log(err.message);
  }
};

await rename();