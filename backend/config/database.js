const { sequelize } = require('../models');

//to make this app Docker-ready, especially when the database container might take a few seconds to be ready, it’s highly recommended to add retry logic right here.
const waitForDbConnection = async (retries = 10, delay = 3000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection established successfully.');
      return true;
    } catch (err) {
      retries--;
      console.warn(`⏳ Waiting for DB... Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error(
    '❌ Failed to connect to the database after multiple attempts.'
  );
};

const initializeDB = async () => {
  try {
    await waitForDbConnection();
    //await sequelize.sync();
    await sequelize.sync({ alter: false, force: false }); // avoid modifying pre-loaded schema
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = initializeDB;
