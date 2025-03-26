const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/request-verification', authController.requestVerification);
router.post('/login', authController.login);
//router.post('/register', authController.register);
router.get('/verifyemail', authController.verifyEmail);

module.exports = router;
