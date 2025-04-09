const { ChatRoom, ChatMessage, User } = require('../models');

exports.startChat = async (req, res) => {
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
};

exports.getMessages = async (req, res) => {
  const messages = await ChatMessage.findAll({
    where: { roomId: req.params.roomId },
    order: [['created_at', 'ASC']], //for this case Sequelize do not auto-alias back to createdAt so we use the real field name
  });

  res.json(messages);
};

exports.getUsersInRoom = async (req, res) => {
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
};

exports.getUsersInfo = async (req, res) => {
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
};
