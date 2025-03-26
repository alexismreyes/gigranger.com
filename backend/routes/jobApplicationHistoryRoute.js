const express = require('express');
const router = express.Router();
const jobApplicationHistoryController = require('../controllers/jobApplicationHistoryController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get(
  '/',
  verifyToken,
  jobApplicationHistoryController.getAllJobsApplicationsHistory
);
router.get(
  '/:id',
  verifyToken,
  jobApplicationHistoryController.getJobApplicationHistoryById
);
router.post(
  '/',
  verifyToken,
  jobApplicationHistoryController.createJobApplicationHistory
);
router.put(
  '/:id',
  verifyToken,
  jobApplicationHistoryController.updateJobApplicationHistory
);
router.delete(
  '/:id',
  verifyToken,
  jobApplicationHistoryController.deleteJobApplicationHistory
);

module.exports = router;
