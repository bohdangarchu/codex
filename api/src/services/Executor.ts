import child_process from 'child_process';
import fs from 'fs';
import { promisify } from 'util';
const exec = promisify(child_process.exec);

// const exec = require('child_process').exec;

const PATH = './docker/userCode.js';
const userCode = `
var n = 5
function fibonacci(num) {
    if (num <= 1) return 1;
  
    return fibonacci(num - 1) + fibonacci(num - 2);
}
console.log('user code output: ' + fibonacci(n));
`;

run();

async function run() {
    // time the execution
    console.time('docker-run');
    const out = await runCode(userCode);
    console.log(out);
    console.timeEnd('docker-run');
}



async function runCode(userCode) {
    writeToFile(PATH, userCode);

    const script = 'docker build --tag test-user-code ./docker/ ' +
        '&& docker run --rm test-user-code';
    return await exec(script);
}


function writeToFile(path, content) {
    fs.writeFile(path, content, err => {
        if (err) {
            console.error('error: ' + err);
        }
    });
}



