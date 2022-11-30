import amqp from "amqplib";
const PORT = 5672
const QUEUE = 'jobs'

class Publisher {
    private channel: amqp.Channel
    async init(msg: string) {
        try {
            const conn = await amqp.connect(`amqp://localhost:${PORT}`);
            this.channel = await conn.createChannel();
            await this.channel.assertQueue(QUEUE);
        } catch (e: any) {
            console.error(e);
        }
    }

    sendMessage(msg: string) {
        this.channel.sendToQueue('jobs', Buffer.from(msg));
        console.log(`Job sent successfully `);
    }
}




