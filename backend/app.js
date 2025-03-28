const express = require('express');
const initializeDB = require('./config/database');
const { initializeRoutes } = require('./routes');
const cors = require('cors');
const path = require('path');

const allowedOrigins = [
  'http://localhost:5173',
  'https://employmentapps3.s3-website.us-east-2.amazonaws.com',
];

const app = express();

// DB Initialization
initializeDB();

// ✅ CORS Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Handle preflight
app.options('*', cors());

// ✅ Serve static resumes if using local fallback
app.use(
  '/uploads/resumes',
  express.static(path.join(__dirname, 'uploads/resumes'))
);

// JSON middleware
app.use(express.json());

// Initialize routes
initializeRoutes(app);

module.exports = app;
