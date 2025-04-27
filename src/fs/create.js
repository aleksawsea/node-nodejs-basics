import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
  try {
  await writeFile(filePath, 'I am fresh and young', { flag: 'wx' })
  } catch (err) {
      if (err.code === 'EEXIST') {
        throw new Error('FS operation failed');
      }
    }
};

await create();
