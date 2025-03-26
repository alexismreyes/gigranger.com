const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, jobsController.getAllJobs);
router.get('/:id', verifyToken, jobsController.getJobById);
router.post('/', verifyToken, jobsController.createJob);
router.put('/:id', verifyToken, jobsController.updateJob);
router.delete('/:id', verifyToken, jobsController.deleteJob);

module.exports = router;
