import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  try {
    await rm(__filename);
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error('FS operation failed');
    } else {
        console.log(err.message);
    }
  }
};

await remove();
