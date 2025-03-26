const express = require('express');
const initializeDB = require('./config/database');
const { initializeRoutes } = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

//DB Initialization
initializeDB();

//Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve static files (uploaded resumes)
//express.static() is middleware that tells Express to serve files from a folder, not handle API logic
//thats why we do not include it the routes/index file
app.use(
  '/uploads/resumes',
  express.static(path.join(__dirname, 'uploads/resumes'))
);

//Routes initialization
initializeRoutes(app);

module.exports = app;
