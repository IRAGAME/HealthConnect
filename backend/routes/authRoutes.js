const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes: /api/auth
router.post('/register/patient', authController.registerPatient);
router.post('/register/staff', authController.registerStaff);
router.post('/login', authController.login);

module.exports = router;
