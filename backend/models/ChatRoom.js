module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    'ChatRoom',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recruiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'recruiter_id',
      },
      jobSeekerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'job_seeker_id',
      },
    },
    {
      tableName: 'chat_rooms',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return ChatRoom;
};
