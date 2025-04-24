const express = require('express');
const router = express.Router();
const jobMatchingController = require('../controllers/jobMatchingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, jobMatchingController.matchJobs);

module.exports = router;
