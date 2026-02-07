const pool = require('../config/db');

class Appointment {
  // Créer un rendez-vous
  static async create(patient_id, docteur_id, date, status = 'En attente') {
    const query = `
      INSERT INTO appointments (patient_id, docteur_id, date, status) 
      VALUES ($1, , , ) 
      RETURNING *`;
    const values = [patient_id, docteur_id, date, status];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Trouver les rendez-vous d'un patient
  static async findByPatientId(patient_id) {
    const query = `
      SELECT a.*, u.nom as docteur_nom, d.specialite
      FROM appointments a
      JOIN docteur d ON a.docteur_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE a.patient_id = 
      ORDER BY a.date DESC`;
    
    try {
      const { rows } = await pool.query(query, [patient_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Trouver les rendez-vous d'un docteur
  static async findByDoctorId(docteur_id) {
    const query = `
      SELECT a.*, u.nom as patient_nom
      FROM appointments a
      JOIN users u ON a.patient_id = u.id
      WHERE a.docteur_id = 
      ORDER BY a.date ASC`;
    
    try {
      const { rows } = await pool.query(query, [docteur_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour le statut (ex: 'Confirmé', 'Annulé')
  static async updateStatus(id, status) {
    const query = `
      UPDATE appointments 
      SET status =  
      WHERE id =  
      RETURNING *`;
    
    try {
      const { rows } = await pool.query(query, [status, id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Appointment;
