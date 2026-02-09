require('dotenv').config(); // Pour charger les variables de .env
//import express from "express";
const express =require('express');
const path=require('path');
const pool= require('./config/db')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const app=express()

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use(express.json()); // Permet au serveur de comprendre le JSON envoyé par le client

// --- Routes ---
app.use('/api/auth', authRoutes);

// --- Données de l'API (simule une base de données en attendant la connexion à PostgreSQL) ---

// --- Route de l'API ---
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
