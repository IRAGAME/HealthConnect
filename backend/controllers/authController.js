// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\authController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerPatient = async (req, res) => {
  const { nom, email, telephone, motdepasse } = req.body;
  try {
    const userCheck = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est deja utilise." });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newUser = await db.query(
<<<<<<< HEAD
      'INSERT INTO patients (nom, email, numero, motdepasse) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, numero',
      [nom, email, telephone, hashedPassword]
=======
      'INSERT INTO patients (nom, email, telephone, motdepasse) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, telephone',
      [nom, email, telephone,hashedPassword]
>>>>>>> 9d4a6065b6cf351da41ccc3888b6f4c7c8add112
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerStaff = async (req, res) => {
  const { nom, email, motdepasse, role } = req.body;
  try {
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est deja utilise." });
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

const normalizeRole = (role) => {
  if (!role) return null;
  const value = String(role).toLowerCase();

  if (value === 'docteur' || value === 'doctor') return 'doctor';
  if (value === 'reception' || value === 'receptionniste') return 'reception';
  if (value === 'admin') return 'admin';
  if (value === 'patient') return 'patient';

  return value;
};

exports.login = async (req, res) => {
  const { email, motdepasse, role } = req.body;

  try {
    if (!email || !motdepasse) {
      return res.status(400).json({ message: 'Email et mot de passe sont obligatoires' });
    }

    const requestedRole = normalizeRole(role);
    let user = null;
    let userRole = requestedRole || null;

    if (requestedRole === 'patient') {
      const patientResult = await db.query('SELECT * FROM patients WHERE email = $1', [email]);
      if (patientResult.rows.length > 0) {
        user = patientResult.rows[0];
        userRole = 'patient';
      }
    } else {
      const staffResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (staffResult.rows.length > 0) {
        user = staffResult.rows[0];
        userRole = normalizeRole(user.role) || user.role;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouve' });
    }

    if (requestedRole && userRole !== requestedRole) {
      return res.status(403).json({ message: "Ce compte n'a pas ce role" });
    }

    const validPass = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!validPass) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, role: userRole || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: userRole || user.role || 'user',
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
