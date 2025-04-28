import path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, 'files', 'archive.gz');
const destination = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
  const gunzip = createGunzip();
  try {
    pipeline(createReadStream(source), gunzip, createWriteStream(destination));
  } catch (err)  {
    console.log(err.message);
  }
};

await decompress();