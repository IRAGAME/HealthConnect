require('dotenv').config(); // Pour charger les variables de .env
//import express from "express";
const express =require('express');
const path=require('path');
const pool= require('./config/db')
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app=express()
/*
app.get('/', (rep, res) => {
    res.send('hello world');
});
app.get('/index', (rep, res) => {
    res.sendFile(path.join (__dirname,'../frontend/index.html'));
});*/

app.use(cors({
  origin: 'http://localhost:5173' 
}));
// Permet au serveur de comprendre le JSON envoyé par le client
app.use(express.json());

// --- Données de l'API (simule une base de données en attendant la connexion à PostgreSQL) ---
const emergenciesData = [
  {
    level: 1,
    icon: 'Phone',
    name: 'emergency.call',
    description: "Urgences vitales telles que l'arrêt cardiaque, la détresse respiratoire sévère, le polytraumatisme grave ou l'hémorragie massive.",
    examples: ['Arrêt cardiaque', 'Détresse respiratoire sévère', 'Polytraumatisme grave', 'Hémorragie massive'],
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950',
    priority: 'emergency.priority1',
  },
  {
    level: 2,
    icon: 'MessageSquare',
    name: 'emergency.message',
    description: 'Urgences cardiovasculaires et neurologiques stables nécessitant une prise en charge rapide.',
    examples: ['Infarctus du myocarde conscient', 'AVC stable', 'Occlusion intestinale sans choc', 'Crise d\'asthme contrôlée'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    priority: 'emergency.priority2',
  },
  {
    level: 3,
    icon: 'Radio',
    name: 'emergency.beep',
    description: 'Urgences infectieuses, digestives ou pédiatriques nécessitant surveillance continue.',
    examples: ['Fièvre élevée avec suspicion de sepsis', 'Déshydratation sévère', 'Fracture ouverte', 'Pancréatite aiguë modérée'],
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    priority: 'emergency.priority3',
  },
  {
    level: 4,
    icon: 'AlertTriangle',
    name: 'emergency.alert',
    description: "Urgences psychiatriques ou modérées avec risque d'aggravation.",
    examples: ['Hypertension sévère non compliquée', 'Convulsions fébriles courtes', 'Brûlures modérées', 'Agitation psychiatrique sans danger immédiat'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    priority: 'emergency.priority4',
  },
];

// --- Route de l'API ---
app.get('/api/emergencies', (req, res) => {
  // Plus tard, vous remplacerez `emergenciesData` par une requête à votre base de données
  // Exemple :
  // try {
  //   const result = await pool.query('SELECT * FROM emergencies');
  //   res.json(result.rows);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Erreur du serveur");
  // }
  res.json(emergenciesData);
});

app.listen(PORT, ()=> {
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});
