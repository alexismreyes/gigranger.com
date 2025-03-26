const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

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
};
