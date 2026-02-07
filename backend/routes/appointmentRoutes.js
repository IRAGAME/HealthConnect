const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
// Vous pourrez ajouter un middleware d'authentification ici plus tard (ex: verifyToken)

// Routes: /api/appointments
router.post('/', appointmentController.createAppointment);
router.get('/patient/:patientId', appointmentController.getPatientAppointments);

module.exports = router;
