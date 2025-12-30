const { spawn } = require('child_process');

const serverProcess = spawn('ts-node', ['src/index.ts'], {
  stdio: 'inherit'
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});