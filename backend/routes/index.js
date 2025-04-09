const path = require('path');

const initializeRoutes = (app) => {
  app.use('/api/v1/jobcategories', require('./jobCategoriesRoute'));
  app.use('/api/v1/jobs', require('./jobsRoute'));
  app.use('/api/v1/companies', require('./companiesRoute'));
  app.use('/api/v1/auth', require('./authRoute'));
  app.use('/api/v1/jobapplication', require('./jobApplicationRoute'));
  app.use(
    '/api/v1/jobapplicationhistory',
    require('./jobApplicationHistoryRoute')
  );
  app.use('/api/v1/users', require('./usersRoute'));
  app.use('/api/v1/status', require('./statusRoute'));
  app.use('/api/v1/roles', require('./rolesRoute'));
  app.use('/api/v1/uploads', require('./uploadRoute'));
  app.use('/api/v1/chat', require('./chatRoute'));
};

module.exports = { initializeRoutes };
