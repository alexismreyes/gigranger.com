const express = require('express');
const router = express.Router();
/* const { ChatRoom, ChatMessage, User } = require('../models'); */
const { verifyToken } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');

//Create or fetch a chat room
router.post('/start', verifyToken, chatController.startChat);
/* router.post('/start', async (req, res) => {
  const { recruiterId, jobSeekerId } = req.body;

  if (!recruiterId || !jobSeekerId) {
    return res
      .status(400)
      .json({ error: 'Both recruiterId and jobSeekerId are required' });
  }

  try {
    let room = await ChatRoom.findOne({ where: { recruiterId, jobSeekerId } });

    if (!room) {
      room = await ChatRoom.create({ recruiterId, jobSeekerId });
    }

    return res.status(200).json({ roomId: room.id });
  } catch (err) {
    console.error('❌ Failed to start chat:', err);
    return res
      .status(500)
      .json({ error: 'Failed to create or fetch chat room' });
  }
}); */

//Get all messages in a room
router.get('/messages/:roomId', /* verifyToken, */ chatController.getMessages);
/* router.get('/messages/:roomId', async (req, res) => {
  const messages = await ChatMessage.findAll({
    where: { roomId: req.params.roomId },
    order: [['created_at', 'ASC']], //for this case Sequelize do not auto-alias back to createdAt so we use the real field name
  });

  res.json(messages);
}); */

// Get users in the room
router.get(
  '/room-users/:roomId',
  /* verifyToken, */ chatController.getUsersInRoom
);
/* router.get('/room-users/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const messages = await ChatMessage.findAll({
      where: { roomId },
      attributes: ['senderId'],
      group: ['senderId'],
    });

    const senderIds = messages.map((m) => m.senderId);

    const users = await User.findAll({
      where: {
        id: senderIds,
      },
      attributes: ['id', 'firstName', 'lastName'],
    });

    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = `${user.firstName} ${user.lastName}`;
    });

    res.json(userMap);
  } catch (error) {
    console.error('❌ Failed to fetch room users', error);
    res.status(500).json({ error: 'Failed to fetch user names' });
  }
}); */

// Get basic user info for multiple roomIds
router.post('/room-usernames', /* verifyToken, */ chatController.getUsersInfo);
/* router.post('/room-usernames', async (req, res) => {
  const { roomIds } = req.body;

  if (!Array.isArray(roomIds)) {
    return res.status(400).json({ error: 'roomIds must be an array' });
  }

  try {
    const rooms = await ChatRoom.findAll({
      where: { id: roomIds },
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: User,
          as: 'jobSeeker',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    const roomDetails = rooms.map((room) => ({
      roomId: room.id,
      participants: {
        recruiter: `${room.recruiter.firstName} ${room.recruiter.lastName}`,
        jobSeeker: `${room.jobSeeker.firstName} ${room.jobSeeker.lastName}`,
      },
    }));

    res.json(roomDetails);
  } catch (error) {
    console.error('❌ Failed to fetch room participants:', error);
    res.status(500).json({ error: 'Failed to fetch chat participants' });
  }
});
 */
module.exports = router;
