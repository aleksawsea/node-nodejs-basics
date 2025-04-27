import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files_copy');

const copy = async () => {
  try {
    await fs.access(sourceDir);
    await fs.cp(sourceDir, destinationDir, { recursive: true, errorOnExist: true, force: false });
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'ERR_FS_CP_EEXIST') {
        throw new Error('FS operation failed');
    } else {
        throw err;
    }
  }
};

await copy();
