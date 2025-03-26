const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, companiesController.getAllCompanies);
router.get('/:id', verifyToken, companiesController.getCompanyById);
router.post('/', verifyToken, companiesController.createCompany);
router.put('/:id', verifyToken, companiesController.updateCompany);
router.delete('/:id', verifyToken, companiesController.deleteCompany);

module.exports = router;
