// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\doctorController.js
const db = require('../config/db');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await db.query(
      `SELECT d.id, d.specialite, d.aviabilite, u.nom, u.email 
       FROM docteur d
       JOIN users u ON d.user_id = u.id`
    );
    res.json(doctors.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
