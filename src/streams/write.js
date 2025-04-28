import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stdin as input } from 'node:process';
import { createInterface } from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  const stream = createWriteStream(filePath);
  const rl = createInterface({ input });
  console.log('Hi there! Please, write your content for the file. To terminate it, use Ctrl+C combination :)');
  rl.on('line', (line) => {
    stream.write(line + '\n');
  });

  process.on('SIGINT', () => {
    rl.close();
  });

  rl.on('error', (err) => {
    console.log(err);
  });
};

await write();
