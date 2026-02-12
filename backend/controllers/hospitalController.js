// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\hospitalController.js
const db = require('../config/db');

exports.createHospital = async (req, res) => {
  // On récupère les données envoyées depuis Postman
  const { nom, adresse, telephone, email, latitude, longitude } = req.body;
  
  try {
    const newHospital = await db.query(
      'INSERT INTO hopitaux (nom, adresse, telephone, email, latitude, longitude) VALUES ($1, , , , , ) RETURNING *',
      [nom, adresse, telephone, email, latitude, longitude]
    );
    res.status(201).json(newHospital.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await db.query('SELECT * FROM hopitaux');
    res.json(hospitals.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
