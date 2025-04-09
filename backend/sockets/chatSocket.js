const { Server } = require('socket.io');
const { ChatMessage } = require('../models');
const { Sequelize } = require('sequelize');

let io;
const connectedUsers = {};
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        console.log('🧠 Socket origin:', origin);
        if (!origin || allowedOrigins.includes(origin.trim())) {
          callback(null, true);
        } else {
          console.error('⛔ Socket.io CORS blocked:', origin);
          callback(new Error('Not allowed by Socket.io CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('registerUser', async (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
      console.log('🧠 Connected Users:', connectedUsers); // ← this will show all online users

      // 💡 Join all rooms the user belongs to
      const { ChatRoom } = require('../models');
      const rooms = await ChatRoom.findAll({
        where: {
          [Sequelize.Op.or]: [{ recruiterId: userId }, { jobSeekerId: userId }],
        },
      });

      rooms.forEach((room) => {
        socket.join(room.id); // ✅ This ensures delivery
        console.log(`User ${userId} auto-joined room ${room.id}`);
      });
    });

    //Join user to a room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    //Listen for new message
    socket.on('sendMessage', async (data) => {
      try {
        // Save to DB
        const saved = await ChatMessage.create({
          roomId: data.roomId,
          senderId: data.senderId,
          message: data.message,
        });

        // Emit to clients
        io.to(data.roomId).emit('messageReceived', saved.toJSON());

        // Notify recipient if online
        const recipientSocket = connectedUsers[data.receiverId];
        if (recipientSocket) {
          io.to(recipientSocket).emit('notify', {
            from: data.senderId,
            message: data.message,
            roomId: data.roomId,
          });
        }
      } catch (err) {
        console.error('❌ Failed to save message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = { initializeSocket, getIO: () => io };
