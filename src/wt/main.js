import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const performCalculations = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const workerFile = path.join(__dirname, 'worker.js');
  const cpuCount = cpus().length;
  const tasks = [];

  for (let i = 0; i < cpuCount; i++) {
    const payload = 10 + i;

    const thread = new Promise((resolve) => {
      const worker = new Worker(workerFile);

      worker.postMessage(payload);

      worker.once('message', (data) => {
        resolve({ status: 'resolved', data });
        worker.terminate();
      });

      worker.once('error', () => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });
    });

    tasks.push(thread);
  }

  const result = await Promise.all(tasks);
  console.log(result);
};

await performCalculations();
