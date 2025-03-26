const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, jobApplicationController.getAllJobsApplications);
router.get(
  '/seeker',
  verifyToken,
  jobApplicationController.getJobApplicationsByUser
);
router.get(
  '/recruiter',
  verifyToken,
  jobApplicationController.getJobApplicationsByRecruiter
);
router.get('/:id', verifyToken, jobApplicationController.getJobApplicationById);
router.post('/', verifyToken, jobApplicationController.createJobApplication);
router.put('/:id', verifyToken, jobApplicationController.updateJobApplication);
router.delete(
  '/:id',
  verifyToken,
  jobApplicationController.deleteJobApplication
);

module.exports = router;
