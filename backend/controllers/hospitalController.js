// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\hospitalController.js
const db = require('../config/db');

exports.createHospital = async (req, res) => {
  // On récupère les données envoyées depuis Postman
  const { nom, adresse, telephone, image_url,email  } = req.body;
  // Génération automatique du slug (ex: "Hôpital Central" -> "hopital-central")
  // On met en minuscule, remplace les espaces par des tirets, et supprime les caractères spéciaux
  const slug = nom.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  try {
    const newHospital = await db.query(
      'INSERT INTO hopitaux (nom, slug, adresse, telephone, image_url,email) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
      [nom, slug, adresse, telephone, image_url,email]
    );
    res.status(201).json(newHospital.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHospitals = async (req, res) => {
  try {
    // Requête pour récupérer les hôpitaux avec leurs spécialités (aggrégées en tableau JSON)
    const query = `
      SELECT h.*, 
             COALESCE(json_agg(s.nom) FILTER (WHERE s.nom IS NOT NULL), '[]') as specialites
      FROM hopitaux h
      LEFT JOIN hopital_specialites hs ON h.id = hs.hopital_id
      LEFT JOIN specialites s ON hs.specialite_id = s.id
      GROUP BY h.id
    `;
    const hospitals = await db.query(query);
    res.json(hospitals.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
