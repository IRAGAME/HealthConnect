// c:\Users\mugis\Desktop\HealthConnect\backend\controllers\appointmentController.js
const db = require('../config/db');

// Créer un rendez-vous et notifier les admins
exports.createAppointment = async (req, res) => {
  const { patient_id, docteur_id, date, medical_condition, medical_description } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // 1. Créer le rendez-vous
    const newAppointmentResult = await client.query(
        `INSERT INTO appointments (patient_id, docteur_id, date, status, medical_condition, medical_description) 
         VALUES ($1, $2, $3, 'En attente', $4, $5) RETURNING *`,
        [patient_id, docteur_id, date, medical_condition, medical_description]
    );
    const newAppointment = newAppointmentResult.rows[0];

    // 2. Créer une notification pour le patient
    await client.query(
        `INSERT INTO notifications (patient_id, type, message, status)
         VALUES ($1, 'Rendez-vous', 'Votre rendez-vous a été créé avec succès et est en attente de confirmation.', 'non_lu')`,
        [patient_id]
    );

    // 3. Récupérer les informations pour la notification de l'admin
    const patientInfo = await client.query('SELECT nom FROM patients WHERE id = $1', [patient_id]);
    const patientName = patientInfo.rows[0]?.nom || 'Un patient';

    const doctorInfo = await client.query(
        `SELECT u.nom as doctor_name, d.hospital_id 
         FROM docteur d 
         JOIN users u ON d.user_id = u.id 
         WHERE d.id = $1`, 
        [docteur_id]
    );
    const doctorName = doctorInfo.rows[0]?.doctor_name || 'un docteur';
    const hospitalId = doctorInfo.rows[0]?.hospital_id;

    // 4. Si l'hôpital est trouvé, notifier les admins de cet hôpital
    if (hospitalId) {
        const admins = await client.query(
            'SELECT user_id FROM admin WHERE hospital_id = $1',
            [hospitalId]
        );

        const notificationMessage = `Nouveau RDV demandé par ${patientName} avec Dr. ${doctorName}.`;
        for (const admin of admins.rows) {
            await client.query(
                `INSERT INTO notifications (user_id, patient_id, type, message, status)
                 VALUES ($1, $2, 'Nouveau RDV', $3, 'non_lu')`,
                [admin.user_id, patient_id, notificationMessage]
            );
        }
    }

    await client.query('COMMIT');
    res.status(201).json(newAppointment);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erreur lors de la création du rendez-vous:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Obtenir tous les rendez-vous (Pour le dashboard Admin)
exports.getAllAppointments = async (req, res) => {
  const { hospitalId } = req.query;
  console.log("Admin demande les RDV. Filtre Hôpital ID:", hospitalId);

  try {
    let query = `SELECT 
         a.id,
         a.docteur_id,
         COALESCE(p.nom, 'Patient Inconnu') AS patient,
         COALESCE(u.nom, 'Docteur Inconnu') AS doctor,
         TO_CHAR(a.date, 'YYYY-MM-DD') as date,
         TO_CHAR(a.date, 'HH24:MI') as time,
         d.specialite AS department,
         a.status
       FROM appointments a
       LEFT JOIN patients p ON a.patient_id = p.id
       LEFT JOIN docteur d ON a.docteur_id = d.id
       LEFT JOIN users u ON d.user_id = u.id`;

    const params = [];
    if (hospitalId) {
      query += ` WHERE d.hospital_id = $1`;
      params.push(hospitalId);
    }

    query += ` ORDER BY a.date DESC`;

    const appointments = await db.query(query, params);
    console.log(`RDV trouvés: ${appointments.rows.length}`);
    res.json(appointments.rows);
  } catch (err) {
    console.error("Erreur récupération RDV:", err);
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un rendez-vous (Status ou Médecin)
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status, docteur_id } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    let query = 'UPDATE appointments SET ';
    const values = [];
    let paramCount = 1;

    if (status) {
      query += `status = $${paramCount}, `;
      values.push(status);
      paramCount++;
    }
    if (docteur_id) {
      query += `docteur_id = $${paramCount}, `;
      values.push(docteur_id);
      paramCount++;
    }

    // Supprimer la virgule finale et ajouter la clause WHERE
    query = query.slice(0, -2);
    query += ` WHERE id = $${paramCount} RETURNING *`;
    values.push(id);

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }

    const appointment = result.rows[0];

    // Gestion des notifications
    if (status) {
        const message = status === 'Confirmé' 
            ? `Votre rendez-vous du ${new Date(appointment.date).toLocaleDateString()} a été confirmé.`
            : status === 'Annulé' 
            ? `Votre rendez-vous du ${new Date(appointment.date).toLocaleDateString()} a été annulé.`
            : `Le statut de votre rendez-vous a changé : ${status}.`;

        await client.query(
            `INSERT INTO notifications (patient_id, type, message, status)
             VALUES ($1, 'Rendez-vous', $2, 'non_lu')`,
            [appointment.patient_id, message]
        );
    }

    await client.query('COMMIT');
    res.json(appointment);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Erreur update appointment:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

// Obtenir les rendez-vous d'un patient
exports.getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await db.query( // Correction pour retourner les données attendues par le frontend
      `SELECT 
         a.id,
         a.status,
         TO_CHAR(a.date, 'YYYY-MM-DD') as date,
         TO_CHAR(a.date, 'HH24:MI') as time,
         doc.specialite AS department, 
         u.nom AS doctor 
       FROM appointments a
       JOIN docteur doc ON a.docteur_id = doc.id
       JOIN users u ON doc.user_id = u.id
       WHERE a.patient_id = $1
       ORDER BY a.date DESC`,
      [patientId]
    );
    res.json(appointments.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
