// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\hospitalController.js
const db = require('../config/db');

exports.createHospital = async (req, res) => {
  // On récupère les données envoyées depuis Postman
  const { nom, adresse, telephone, image_url } = req.body;
  
  // Génération automatique du slug (ex: "Hôpital Central" -> "hopital-central")
  // On met en minuscule, remplace les espaces par des tirets, et supprime les caractères spéciaux
  const slug = nom.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  try {
    const newHospital = await db.query(
      'INSERT INTO hopitaux (nom, slug, adresse, telephone, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nom, slug, adresse, telephone, image_url]
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
