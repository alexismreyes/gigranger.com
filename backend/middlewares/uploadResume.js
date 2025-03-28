const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

let storage;

if (process.env.S3_BUCKET_NAME) {
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  console.log('✅ Using AWS SDK v3 + S3Client for storage');

  storage = multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    //acl: 'public-read',
    key: (req, file, cb) => {
      const fileName = `resumes/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
} else {
  // fallback to local disk
  const path = require('path');
  const fs = require('fs');
  const localPath = path.join(__dirname, '../uploads/resumes');

  if (!fs.existsSync(localPath)) fs.mkdirSync(localPath, { recursive: true });

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, localPath),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });

  /*  console.log('📁 Using local storage fallback'); */
}

const upload = multer({ storage });
module.exports = upload;
