const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: 'mysql',
  timezone: '-06:00',
});

// Import models
const JobCategories = require('./JobCategories')(sequelize, DataTypes);
const Jobs = require('./Jobs')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Companies = require('./Companies')(sequelize, DataTypes);
const JobApplication = require('./JobApplication')(sequelize, DataTypes);
const JobApplicationHistory = require('./JobApplicationHistory')(
  sequelize,
  DataTypes
);
const Status = require('./Status')(sequelize, DataTypes);
const EmailVerification = require('./EmailVerification')(sequelize, DataTypes);
const ChatRoom = require('./ChatRoom')(sequelize, DataTypes);
const ChatMessage = require('./ChatMessage')(sequelize, DataTypes);

//Associations added to show participant names in the multiple chat rooms modal
ChatRoom.belongsTo(User, { as: 'recruiter', foreignKey: 'recruiterId' });
ChatRoom.belongsTo(User, { as: 'jobSeeker', foreignKey: 'jobSeekerId' });

module.exports = {
  sequelize,
  JobCategories,
  Jobs,
  Role,
  User,
  Companies,
  JobApplication,
  JobApplicationHistory,
  Status,
  EmailVerification,
  ChatRoom,
  ChatMessage,
};
