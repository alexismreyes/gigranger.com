// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route: POST /upload/resume
router.post('/resume', upload.single('resume'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${
    file.filename
  }`;
  res.status(200).json({ url: fileUrl }); // 👈 Send this URL to the frontend and store it in the DB
});

module.exports = router;
