import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filesFolder = path.join(__dirname, 'files');

const list = async () => {
  try {
    const files = await readdir(filesFolder, { recursive: true });
    for (const file of files) {
        console.log(file);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error('FS operation failed');
    } else {
        console.log(err.message);
    }
  }
};

await list();
