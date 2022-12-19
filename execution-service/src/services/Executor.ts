import fs from 'fs';
import { promisify } from 'util';
import child_process from 'child_process';
import { json } from 'stream/consumers';
const exec = promisify(child_process.exec);
const PATH = './docker/userCode.js';

export interface Output {
    stdout: string,
    stderr: string,
    timeout: boolean
}

export class Executor {

    async runCode(code: string, langId: number): Promise<Output> {
        const runner = this.getRunner(langId);
        const script = `docker run --rm ${runner} "${code}"`
        const output = await exec(script);
        // output object is always in stdout
        return JSON.parse(output.stdout);
    }

    getRunner(langId: number): string {
        switch (langId) {
            case 1:
                return 'js-code-runner';
            case 2:
                return 'python-code-runner';
        }
    }

}





