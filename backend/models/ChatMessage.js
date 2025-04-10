module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    'ChatMessage',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'room_id',
        references: {
          model: 'ChatRoom',
          key: 'id',
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id',
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_read',
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'receiver_id',
      },
    },
    {
      tableName: 'chat_messages',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return ChatMessage;
};
