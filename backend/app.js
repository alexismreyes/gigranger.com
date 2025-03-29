const express = require('express');
const initializeDB = require('./config/database');
const { initializeRoutes } = require('./routes');
const corsMiddleware = require('./middlewares/corsMiddleware');
const path = require('path');

const app = express();

// Initialize DB
initializeDB();

//CORS Handling
app.use(corsMiddleware);
app.options('*', corsMiddleware); // Handle preflight requests

// 📁 Serve static resumes (only applies in local mode)
app.use(
  '/uploads/resumes',
  express.static(path.join(__dirname, 'uploads/resumes'))
);

//Parse JSON
app.use(express.json());

//Initialize routes
initializeRoutes(app);

module.exports = app;
