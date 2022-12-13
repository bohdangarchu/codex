import amqp from "amqplib";
const PORT = 5672
const QUEUE = 'jobs'
interface QueueSubmission {
    submId: string,
    langId: number
} 
export class Publisher {
    private channel: amqp.Channel

    async init() {
        try {
            const conn = await amqp.connect(`amqp://localhost:${PORT}`);
            this.channel = await conn.createChannel();
            await this.channel.assertQueue(QUEUE);
        } catch (e: any) {
            console.error(e);
        }
    }

    processSubmission(subm: QueueSubmission) {
        this.channel.sendToQueue('jobs', Buffer.from(JSON.stringify(subm)));
        console.log(`Job ${subm} sent successfully `);
    }
}




