const parseArgs = () => {
  const cliArgs = process.argv.slice(2);
  const result = [];

  for (let i = 0; i < cliArgs.length; i += 2) {
    const key = cliArgs[i];
    const value = cliArgs[i + 1];
    result.push(`${key.slice(2)} is ${value}`);
  }
  if (result.length > 0) {
    console.log(result.join(', '))
  }
};

parseArgs();
