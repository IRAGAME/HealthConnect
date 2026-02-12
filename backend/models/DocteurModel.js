const pool = require('../config/db');

class Doctor {
  // Créer un profil docteur
  static async create(nom, email, motdepasse, specialite, aviabilite) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // 1. Créer l'utilisateur
      const userQuery = 'INSERT INTO users (nom, email, motdepasse, role) VALUES ($1, $2, $3, $4) RETURNING id';
      const userRes = await client.query(userQuery, [nom, email, motdepasse, 'Docteur']);
      const userId = userRes.rows[0].id;

      // 2. Créer l'entrée docteur liée
      const docQuery = 'INSERT INTO docteur (user_id, specialite, aviabilite) VALUES ($1, $2, $3) RETURNING *';
      const { rows } = await client.query(docQuery, [userId, specialite, aviabilite]);
      
      await client.query('COMMIT');
      return { ...rows[0], nom, email };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
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
      WHERE d.id = $1`;
    
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Doctor;
