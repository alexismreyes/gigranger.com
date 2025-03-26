const express = require('express');
const router = express.Router();
const jobCategoriesController = require('../controllers/jobCategoriesController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, jobCategoriesController.getAllJobCategories);
router.get('/:id', verifyToken, jobCategoriesController.getJobCategoryById);
router.post('/', verifyToken, jobCategoriesController.createJobCategory);
router.put('/:id', verifyToken, jobCategoriesController.updateJobCategory);
router.delete('/:id', verifyToken, jobCategoriesController.deleteJobCategory);

module.exports = router;
