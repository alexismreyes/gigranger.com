const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadResume');

router.post('/resumes', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File upload failed' });
  }

  // If using S3 (req.file.location will exist)
  if (req.file.location) {
    return res.status(200).json({ resumeUrl: req.file.location });
  }

  // If using local disk, manually construct the URL
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${
    req.file.filename
  }`;
  return res.status(200).json({ resumeUrl: fileUrl });
});

module.exports = router;
