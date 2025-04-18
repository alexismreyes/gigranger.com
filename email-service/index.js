require('dotenv').config();
const amqp = require('amqplib');

//we use this connectWithRetry method because depends_on in Docker only ensures that the container
// starts, not that the service inside (like RabbitMQ) is ready to accept connections.
//RabbitMQ takes a few seconds to fully boot up, especially with the management UI enabled.

const connectWithRetry = async (retries = 20, delay = 3000) => {
  while (retries) {
    try {
      const rabbitUser = process.env.RABBITMQ_DEFAULT_USER;
      const rabbitPass = process.env.RABBITMQ_DEFAULT_PASS;

      const connection = await amqp.connect(
        `amqp://${rabbitUser}:${rabbitPass}@rabbitmq:5672`
      );
      const channel = await connection.createChannel();
      await channel.assertQueue('email_queue');

      console.log('📥 Email service is listening for jobs...');

      channel.consume('email_queue', async (msg) => {
        const data = JSON.parse(msg.content.toString());
        try {
          const {
            sendVerificationEmail,
            sendMailToApplicants,
            sendMailToRecruiter,
          } = require('./emailHandlers');

          if (data.type === 'verifyEmail') {
            await sendVerificationEmail(data.to, data.link);
          } else if (data.type === 'notifyRecruiter') {
            await sendMailToRecruiter(data);
          } else if (data.type === 'notifyApplicant') {
            await sendMailToApplicants(data);
          }

          channel.ack(msg);
        } catch (error) {
          console.error('❌ Failed to process email job:', error);
          // Optionally: don't ack to allow retry
        }
      });

      break; // 🎉 Exit retry loop on success
    } catch (err) {
      console.warn(
        `⏳ RabbitMQ not ready yet. Retrying in ${delay / 1000}s...`
      );
      console.error(err);
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  if (!retries) {
    console.error('❌ Could not connect to RabbitMQ after multiple retries');
    process.exit(1);
  }
};

connectWithRetry();
