const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let storage;

if (process.env.NODE_ENV === 'production') {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  console.log('✅ Using AWS S3 storage (production)');

  storage = multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      const fileName = `resumes/${Date.now()}-${file.originalname}`;
      req.savedResumeUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;
      cb(null, fileName);
    },
  });
} else {
  const localPath = path.join(__dirname, '../uploads/resumes');
  if (!fs.existsSync(localPath)) fs.mkdirSync(localPath, { recursive: true });

  console.log('📁 Using local disk storage (development)');

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, localPath),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
}

const upload = multer({ storage });
module.exports = upload;
