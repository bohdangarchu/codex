import { Executor } from './Executor'

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
    const codeId = '63619ee6546b4cfab2945b93'
    const ex = new Executor();
    const out = await ex.runCode(codeId);
    console.log(out);
    console.timeEnd('docker-run');
}