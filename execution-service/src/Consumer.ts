import amqp from "amqplib";
const PORT = 5672

async function connect() {
    const queue = 'jobs';
    try {
        const conn = await amqp.connect(`amqp://localhost:${PORT}`);
        const channel = await conn.createChannel();
        const res = await channel.assertQueue(queue);
        console.log(" [*] Waiting for messages in %s.", queue);
        channel.consume(queue, function(msg: any) {
            console.log(" [x] Received %s", msg.content.toString());
        });
        
    } catch (e: any) {
        console.error(e);
    }
}

connect();