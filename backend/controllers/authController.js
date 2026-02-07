// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\authController.js
const db = require('../config/db'); // Votre configuration DB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, motdepasse, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newUser = await db.query(
      'INSERT INTO users (nom, email, Motdepasse, role) VALUES ($1, , , ) RETURNING id, nom, email, role',
      [nom, email, hashedPassword, role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email = ', [email]);
    if (user.rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const validPass = await bcrypt.compare(motdepasse, user.rows[0].motdepasse);
    if (!validPass) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.rows[0].id, nom: user.rows[0].nom, role: user.rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
