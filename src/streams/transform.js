import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { stdin, stdout } from 'node:process';

const transform = async () => {
  const myTransform = new Transform({
    transform(chunk, encoding, callback) {
      const str = chunk.toString();
      const reversedStr = str.split('').reverse().join('');
      callback(null, reversedStr);
    },
  });

  try {
    console.log(
      'Hi there! Please, write something you want to transform. To terminate it, use Ctrl+C combination :)'
    );
    await pipeline(stdin, myTransform, stdout);
  } catch (err) {
    console.log(err.message);
  }
};

await transform();
