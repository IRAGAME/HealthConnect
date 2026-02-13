// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\specialtyController.js
const db = require('../config/db');

// Récupérer toutes les spécialités disponibles
exports.getAllSpecialties = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM specialites ORDER BY nom');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Créer une nouvelle spécialité
exports.createSpecialty = async (req, res) => {
    const { nom, icon } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO specialites (nom, icon) VALUES ($1, $2) RETURNING *', 
            [nom, icon]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lier une spécialité à un hôpital
exports.addSpecialtyToHospital = async (req, res) => {
    const { hospitalId, specialtyId } = req.body;
    try {
        await db.query(
            'INSERT INTO hopital_specialites (hopital_id, specialite_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', 
            [hospitalId, specialtyId]
        );
        res.status(201).json({ message: "Spécialité ajoutée à l'hôpital avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};