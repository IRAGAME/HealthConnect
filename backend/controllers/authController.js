// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\authController.js
const db = require('../config/db'); // Votre configuration DB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerPatient = async (req, res) => {
  const { nom, email, motdepasse, telephone } = req.body;
  try {
    // Vérification si l'email existe déjà
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    // Note: 'telephone' a été retiré de l'INSERT car la colonne n'existe pas dans la table users actuelle
    const newUser = await db.query(
      'INSERT INTO users (nom, email, motdepasse, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role',
      [nom, email, hashedPassword, 'patient']
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const validPass = await bcrypt.compare(motdepasse, user.rows[0].motdepasse);
    if (!validPass) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.rows[0].id, nom: user.rows[0].nom, role: user.rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
