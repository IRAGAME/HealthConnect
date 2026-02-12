// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\doctorController.js
const Doctor = require('../models/DocteurModel');
const bcrypt = require('bcrypt');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  const { nomcomplet, email, numero, motdepasse, specialite, aviabilite } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    // Note: 'numero' n'est pas stocké car il n'est pas dans le schéma 'users' ou 'docteur' actuel
    const newDoctor = await Doctor.create(nomcomplet, email, hashedPassword, specialite, aviabilite);
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Docteur non trouvé" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
