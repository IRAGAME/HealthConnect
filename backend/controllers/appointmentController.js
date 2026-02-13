// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\appointmentController.js
const db = require('../config/db');

// Créer un rendez-vous (Correspond à BookAppointmentScreen)
exports.createAppointment = async (req, res) => {
  const { patient_id, docteur_id, date, medical_condition, medical_description } = req.body;
  try {
    const newAppointment = await db.query(
      `INSERT INTO appointments 
      (patient_id, docteur_id, date, status, medical_condition, medical_description) 
      VALUES ($1, $2, $3, 'En attente', $4, $5) 
      RETURNING *`,
      [patient_id, docteur_id, date, medical_condition, medical_description]
    );
    
    // Créer une notification automatique (Fonctionnalité 1 du frontend)
    await db.query(
      `INSERT INTO notifications (patient_id, type, message, sent_at, status)
       VALUES ($1, 'Rendez-vous', 'Votre rendez-vous a été créé avec succès.', NOW(), 'non_lu')`,
      [patient_id]
    );

    res.status(201).json(newAppointment.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les rendez-vous d'un patient
exports.getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await db.query(
      `SELECT a.*, d.specialite, u.nom as docteur_nom 
       FROM appointments a
       JOIN docteur doc ON a.docteur_id = doc.id
       JOIN users u ON doc.user_id = u.id
       WHERE a.patient_id = $1
       ORDER BY a.date DESC`,
      [patientId]
    );
    res.json(appointments.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
