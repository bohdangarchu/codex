import amqp from "amqplib";
import { Executor } from "./Executor";
const PORT = 5672
const executor = new Executor()


async function connect() {
    const queue = 'jobs';
    try {
        const conn = await amqp.connect(`amqp://localhost:${PORT}`);
        const channel = await conn.createChannel();
        const res = await channel.assertQueue(queue);
        console.log(" [*] Waiting for messages in %s.", queue);
        channel.consume(queue, consumeJob, {
            noAck: true
        });
        
    } catch (e: any) {
        console.error(e);
    }
}

async function consumeJob(msg: any) {
    console.log(" [x] Received %s", msg.content.toString());
    const jobId = msg.content.toString();
    const response = await executor.runCode(jobId);
    console.log(response);
    // save the output in the db
}

connect();

