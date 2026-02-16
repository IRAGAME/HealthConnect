require('dotenv').config(); // Pour charger les variables de .env
//import express from "express";
const express =require('express');
const path=require('path');
const pool= require('./config/db')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const receptionistRoutes = require('./routes/receptionistRoutes');
const userRoutes = require('./routes/userRoutes');


const PORT = process.env.PORT || 5000;
const app=express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin non autorisee: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json()); // Permet au serveur de comprendre le JSON envoyé par le client

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/appointments',appointmentRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/receptionists', receptionistRoutes);
app.use('/api/users', userRoutes);
// --- Données de l'API (simule une base de données en attendant la connexion à PostgreSQL) ---

// --- Route de l'API ---
app.get('/api/dashboard/stats', async (req, res) => {
  const { hospitalId } = req.query;
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    
    let appointmentsQuery = 'SELECT COUNT(*) FROM appointments';
    let todayAppointmentsQuery = "SELECT COUNT(*) FROM appointments WHERE date::date = CURRENT_DATE";
    let pendingAppointmentsQuery = "SELECT COUNT(*) FROM appointments WHERE status = 'En attente'";
    
    const params = [];
    if (hospitalId) {
      // Si un hôpital est spécifié, on doit faire une jointure avec la table docteur
      const joinClause = ' a JOIN docteur d ON a.docteur_id = d.id WHERE d.hospital_id = $1';
      appointmentsQuery = 'SELECT COUNT(*) FROM appointments' + joinClause;
      todayAppointmentsQuery = "SELECT COUNT(*) FROM appointments" + joinClause + " AND a.date::date = CURRENT_DATE";
      pendingAppointmentsQuery = "SELECT COUNT(*) FROM appointments" + joinClause + " AND a.status = 'En attente'";
      params.push(hospitalId);
    }

    const appointmentsCount = await pool.query(appointmentsQuery, params);
    const todayAppointmentsCount = await pool.query(todayAppointmentsQuery, params);
    const pendingAppointmentsCount = await pool.query(pendingAppointmentsQuery, params);

    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalAppointments: parseInt(appointmentsCount.rows[0].count),
      todayAppointments: parseInt(todayAppointmentsCount.rows[0].count),
      pendingAppointments: parseInt(pendingAppointmentsCount.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

app.get('/api/emergencies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM emergencies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
});

app.listen(PORT, ()=> {
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});
