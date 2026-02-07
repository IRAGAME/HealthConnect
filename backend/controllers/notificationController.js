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
    const user = await db.query('SELECT * FROM users WHERE email = // c:\Users\mugis\Desktop\HealthConnect\backend\controllers\appointmentController.js
    const db = require('../config/db');
    
    // Créer un rendez-vous (Correspond à BookAppointmentScreen)
    exports.createAppointment = async (req, res) => {
      const { patient_id, docteur_id, date, medical_condition, medical_description } = req.body;
      try {
        const newAppointment = await db.query(
          `INSERT INTO appointments 
          (patient_id, docteur_id, date, status, medical_condition, medical_description) 
          VALUES ($1, , , 'En attente', , ) 
          RETURNING *`,
          [patient_id, docteur_id, date, medical_condition, medical_description]
        );
        
        // Créer une notification automatique (Fonctionnalité 1 du frontend)
        await db.query(
          `INSERT INTO notifications (user_id, type, message, sent_at, status)
           VALUES (// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\doctorController.js
           const db = require('../config/db');
           
           exports.getAllDoctors = async (req, res) => {
             try {
               const doctors = await db.query(
                 `SELECT d.id, d.specialite, d.aviabilite, u.nom, u.email 
                  FROM docteur d
                  JOIN users u ON d.user_id = u.id`
               );
               res.json(doctors.rows);
             } catch (err) {
               res.status(500).json({ error: err.message });
             }
           };
           // c:\Users\mugis\Desktop\HealthConnect\backend\controllers\notificationController.js
           const db = require('../config/db');
           
           exports.getUserNotifications = async (req, res) => {
             const { userId } = req.params;
             try {
               const notifs = await db.query(
                 'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC',
                 [userId]
               );
               res.json(notifs.rows);
             } catch (err) {
               res.status(500).json({ error: err.message });
             }
           };
           
           exports.markAsRead = async (req, res) => {
             const { id } = req.params;
             try {
               await db.query("UPDATE notifications SET status = 'lu' WHERE id = // c:\Users\mugis\Desktop\HealthConnect\backend\controllers\notificationController.js
               const db = require('../config/db');
               
               exports.getUserNotifications = async (req, res) => {
                 const { userId } = req.params;
                 try {
                   const notifs = await db.query(
                     'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC',
                     [userId]
                   );
                   res.json(notifs.rows);
                 } catch (err) {
                   res.status(500).json({ error: err.message });
                 }
               };
               
               exports.markAsRead = async (req, res) => {
                 const { id } = req.params;
                 try {
                   await db.query("UPDATE notifications SET status = 'lu' WHERE id = ", [id]);
                   res.json({ message: "Notification marquée comme lue" });
                 } catch (err) {
                   res.status(500).json({ error: err.message });
                 }
               };
               ", [id]);
               res.json({ message: "Notification marquée comme lue" });
             } catch (err) {
               res.status(500).json({ error: err.message });
             }
           };
           , 'Rendez-vous', 'Votre rendez-vous a été créé avec succès.', NOW(), 'non_lu')`,
          [patient_id]
        );
    
        res.status(201).json(newAppointment.rows[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    // Obtenir les rendez-vous d'un patient
    exports.getPatientAppointments = async (req, res) => {
      const { patientId } = req.params;
      try {
        const appointments = await db.query(
          `SELECT a.*, d.specialite, u.nom as docteur_nom 
           FROM appointments a
           JOIN docteur doc ON a.docteur_id = doc.id
           JOIN users u ON doc.user_id = u.id
           WHERE a.patient_id = // c:\Users\mugis\Desktop\HealthConnect\backend\controllers\doctorController.js
const db = require('../config/db');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await db.query(
      `SELECT d.id, d.specialite, d.aviabilite, u.nom, u.email 
       FROM docteur d
       JOIN users u ON d.user_id = u.id`
    );
    res.json(doctors.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\notificationController.js
const db = require('../config/db');

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifs = await db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC',
      [userId]
    );
    res.json(notifs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE notifications SET status// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\notificationController.js
const db = require('../config/db');

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifs = await db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC',
      [userId]
    );
    res.json(notifs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE notifications SET status = 'lu' WHERE id = ", [id]);
        res.json({ message: "Notification marquée comme lue" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
     = 'lu' WHERE id = ", [id]);
    res.json({ message: "Notification marquée comme lue" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

           ORDER BY a.date DESC`,
          [patientId]
        );
        res.json(appointments.rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    ', [email]);
    if (user.rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const validPass = await bcrypt.compare(motdepasse, user.rows[0].motdepasse);
    if (!validPass) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.rows[0].id, nom: user.rows[0].nom, role: user.rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
