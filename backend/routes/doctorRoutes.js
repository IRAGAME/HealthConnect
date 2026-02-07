const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Routes: /api/doctors
router.get('/', doctorController.getAllDoctors);

module.exports = router;
