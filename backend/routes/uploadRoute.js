const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadResume');

router.post('/resumes', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File upload failed' });
  }

  // ✅ S3 upload: fix domain issue if needed
  if (req.file.location) {
    return res.status(200).json({ resumeUrl: req.file.location });
  }

  // ✅ Local disk fallback
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${
    req.file.filename
  }`;
  //return res.status(200).json({ resumeUrl: fileUrl });
  return res.status(200).json({ resumeUrl: req.savedResumeUrl });
});

module.exports = router;
