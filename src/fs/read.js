import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __fileName = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    const fileContent = await readFile(__fileName, { encoding: 'utf8' });
    console.log(fileContent);
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error('FS operation failed');
    } else {
        console.log(err.message);
    }
  }
};

await read();
