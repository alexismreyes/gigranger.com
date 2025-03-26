const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, statusController.getAllStatus);

module.exports = router;
