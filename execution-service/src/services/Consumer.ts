import amqp from "amqplib";
import { SubmissionModel } from "../models/Submission";
import { Executor, Output } from "./Executor";
import { db } from '../config/DbSetup';
const PORT = 5672
const executor = new Executor()

interface QueueSubmission {
    submId: string,
    langId: number
}

async function connect() {
    const queue = 'jobs';
    try {
        const conn = await amqp.connect(`amqp://localhost:${PORT}`);
        const channel = await conn.createChannel();
        const res = await channel.assertQueue(queue);
        console.log(" [*] Waiting for messages in %s.", queue);
        channel.consume(queue, consumeJob, { noAck: true });
        
    } catch (e: any) {
        console.error(e);
    }
}

async function consumeJob(msg: any) {
    console.log(" [x] Received job %s", msg.content.toString());
    const queueSubmission = JSON.parse(msg.content.toString());
    const output = await runCode(queueSubmission);
    console.log("output from docker container: " + JSON.stringify(output));

    const filter = { '_id': queueSubmission.submId };
    const update = { 
        output: output,
        status: "Finished"
    };
    let subm = await SubmissionModel.findOneAndUpdate(filter, update, { new: true });
    // console.log('submission updated: ' + subm.toString());
}

async function runCode(qs: QueueSubmission): Promise<Output> {
    // TODO trim last \n ofstdout and stderr
    const code  = await fetchCode(qs.submId);
    return await executor.runCode(code, qs.langId);
}

async function fetchCode(codeId: string): Promise<string> {
    return (await SubmissionModel.findById(codeId)).code;
}

db.connect();

connect();

