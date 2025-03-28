const express = require('express');
const initializeDB = require('./config/database');
const { initializeRoutes } = require('./routes');
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:5173', // local frontend
  'https://employmentapps3.s3-website.us-east-2.amazonaws.com', // production frontend
];
const path = require('path');

const app = express();

//DB Initialization
initializeDB();

//Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Serve static files for local resume access
app.use(
  '/uploads/resumes',
  express.static(path.join(__dirname, 'uploads/resumes'))
);

app.use(express.json());

//Routes initialization
initializeRoutes(app);

module.exports = app;
