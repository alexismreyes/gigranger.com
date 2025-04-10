const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');

//Create or fetch a chat room
router.post('/start', verifyToken, chatController.startChat);

//Get all messages in a room
router.get('/messages/:roomId', /* verifyToken, */ chatController.getMessages);

// Get users in the room
router.get('/room-users/:roomId', verifyToken, chatController.getUsersInRoom);

// Get basic user info for multiple roomIds
router.post('/room-usernames', verifyToken, chatController.chatUsersInfo);

//retrieve unread messages for offline fallback
router.get('/unread-messages', verifyToken, chatController.getUnreadMessages);

//mark messages as read
router.get('/mark-as-read/:roomId', verifyToken, chatController.markAsRead);

module.exports = router;
