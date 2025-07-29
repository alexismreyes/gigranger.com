require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

console.log('process.env.NODE_ENV->', process.env.NODE_ENV);

const app = require('./app');

const http = require('http');
const { initializeSocket } = require('./sockets/chatSocket');
const initializeDB = require('./config/database');

const PORT = process.env.PORT;

(async () => {
  try {
    await initializeDB(); // ✅ Wait for DB to connect first

    const server = http.createServer(app);

    // ✅ Only initialize sockets once DB is connected
    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start the app:', err);
    process.exit(1);
  }
})();
