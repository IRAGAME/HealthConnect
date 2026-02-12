// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\authController.js
const db = require('../config/db'); // Votre configuration DB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerPatient = async (req, res) => {
  const { nom, email,telephone,motdepasse} = req.body;
  try {
    // Vérification si l'email existe déjà
    const userCheck = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newUser = await db.query(
      'INSERT INTO patients (nom, email, telephone, motdepasse) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, telephone',
      [nom, email, telephone,hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.registerStaff = async (req, res) => {
  const { nom, email, motdepasse, role, specialite } = req.body;
  try {
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newUser = await db.query(
      'INSERT INTO users (nom, email, motdepasse, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role',
      [nom, email, hashedPassword, role || 'staff']
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    // 1. Trouver l'utilisateur
    const userResult = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const patient = userResult.rows[0];

    // 2. Comparer le mot de passe
    const validPass = await bcrypt.compare(motdepasse, patient.motdepasse);
    if (!validPass) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // 3. Créer le token JWT
    const token = jwt.sign(
      { id: patient.id, role: 'patient' }, // On assigne le rôle 'patient' manuellement
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4. Renvoyer le token et les informations de l'utilisateur
    res.json({ token, user: { id: patient.id, nom: patient.nom, email: patient.email, role: 'patient' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
