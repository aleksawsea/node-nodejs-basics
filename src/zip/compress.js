import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, 'files', 'fileToCompress.txt');
const destination = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const gzip = createGzip();
  try {
    pipeline(createReadStream(source), gzip, createWriteStream(destination));
  } catch (err)  {
    console.log(err.message);
  }
};

await compress();
