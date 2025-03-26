const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ PUBLIC endpoint for fetching roles
router.get('/', roleController.getAllRoles);

// 🔐 Protected endpoints //not implemented yet until needed
/* router.post('/', verifyToken, roleController.createRole);
router.put('/:id', verifyToken, roleController.updateRole);
router.delete('/:id', verifyToken, roleController.deleteRole); */

module.exports = router;
