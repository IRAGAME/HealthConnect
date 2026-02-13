// c:\Users\mugis\Desktop\HealthConnect\backend\routes\specialtyRoutes.js
const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialtyController');

router.get('/', specialtyController.getAllSpecialties);
router.post('/', specialtyController.createSpecialty);
router.post('/link', specialtyController.addSpecialtyToHospital);

module.exports = router;