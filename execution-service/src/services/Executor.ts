import fs from 'fs';
import { promisify } from 'util';
import child_process from 'child_process';
const exec = promisify(child_process.exec);
const PATH = './docker/userCode.js';

export class Executor {
    async runJsCode(code: string) : Promise<any> {
        const script = `docker run --rm js-code-runner "${code}"`
        return await exec(script);
    }

    async runPythonCode(code: string) : Promise<any> {
        const script = `docker run --rm python-code-runner "${code}"`
        return await exec(script);
    }

}





