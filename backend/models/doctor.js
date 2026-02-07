const pool = require('../config/db');

class Doctor {
  // Créer un profil docteur
  static async create(user_id, specialite, aviabilite) {
    const query = `
      INSERT INTO docteur (user_id, specialite, aviabilite) 
      VALUES ($1, , ) 
      RETURNING *`;
    const values = [user_id, specialite, aviabilite];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les docteurs avec leurs infos utilisateur (nom, email)
  static async findAll() {
    const query = `
      SELECT d.*, u.nom, u.email 
      FROM docteur d
      JOIN users u ON d.user_id = u.id`;
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Trouver un docteur par son ID
  static async findById(id) {
    const query = `
      SELECT d.*, u.nom, u.email 
      FROM docteur d
      JOIN users u ON d.user_id = u.id
      WHERE d.id = `;
    
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Doctor;
