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

const server = http.createServer(app);

//webSocket setup
initializeSocket(server);

const PORT = process.env.PORT;

/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); */

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
