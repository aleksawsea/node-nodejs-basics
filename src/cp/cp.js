import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const spawnChildProcess = async (args) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const scriptPath = path.join(__dirname, 'files', 'script.js');

  const child = spawn(
    process.execPath,
    [scriptPath, ...args],
    { stdio: ['pipe', 'pipe', 'inherit'] }
  );

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
