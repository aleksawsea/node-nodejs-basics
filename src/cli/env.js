const parseEnv = () => {
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);
  if (envVars.length > 0) {
    console.log(envVars.join('; '));
  }
};

parseEnv();
