import fs from 'fs';
import { promisify } from 'util';
import child_process from 'child_process';
const exec = promisify(child_process.exec);
const PATH = './docker/userCode.js';

export class Executor {
    async runCode(codeId: string) : Promise<any> {
        const script = `docker run --rm code-runner ${codeId}`
        return await exec(script);
    }

    // not used
    writeToFile(path: string, content: string) {
        fs.writeFile(path, content, err => {
            if (err) {
                console.error('error: ' + err);
            }
        });
    }

}





