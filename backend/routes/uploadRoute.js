const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadResume');

router.post('/resumes', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File upload failed' });
  }

  // ✅ Return CloudFront-compatible URL
  if (req.savedResumeUrl) {
    return res.status(200).json({ resumeUrl: req.savedResumeUrl });
  }

  // ✅ Fallback for development
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${
    req.file.filename
  }`;
  return res.status(200).json({ resumeUrl: fileUrl });
});

module.exports = router;
