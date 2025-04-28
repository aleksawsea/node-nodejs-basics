import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stdout } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => {
      stdout.write(chunk);
    });

    stream.once('error', (err) => {
      console.log(err);
      reject(err);
    });

    stream.once('end', () => {
      stdout.write('\n');
      resolve()
    });
  });
};

await read();
