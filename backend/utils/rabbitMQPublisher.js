require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});
const amqp = require('amqplib');

let channel;

const rabbitUser = process.env.RABBITMQ_DEFAULT_USER;
const rabbitPass = process.env.RABBITMQ_DEFAULT_PASS;
const rabbitHost = process.env.RABBITMQ_HOST || 'rabbitmq';

const connectRabbitMQ = async () => {
  const connection = await amqp.connect(
    `amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:5672`
  );
  channel = await connection.createChannel();
  await channel.assertQueue('email_queie');
};

const publishToQueue = async (emailJob) => {
  if (!channel) await connectRabbitMQ();
  channel.sendToQueue('email_queue', Buffer.from(JSON.stringify(emailJob)));
};

module.exports = { publishToQueue };
