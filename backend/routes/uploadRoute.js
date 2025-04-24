const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadResume');

router.post('/resumes', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File upload failed' });
  }

  // ✅ S3 upload: fix domain issue if needed
  if (req.file.location) {
    let resumeUrl = req.file.location;

    // 🛠 Patch invalid subdomain pattern caused by dot in bucket name
    if (resumeUrl.includes('gigranger.com.s3')) {
      resumeUrl = resumeUrl.replace('gigranger.com.s3', 'gigranger.s3');
    }

    return res.status(200).json({ resumeUrl });
  }

  // ✅ Local disk fallback
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${
    req.file.filename
  }`;
  return res.status(200).json({ resumeUrl: fileUrl });
});

module.exports = router;
