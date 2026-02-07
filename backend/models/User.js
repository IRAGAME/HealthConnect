const pool = require('../config/db');

class User {
  // Créer un nouvel utilisateur
  static async create(nom, email, motdepasse, role) {
    const query = `
      INSERT INTO users (nom, email, motdepasse, role) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [nom, email, motdepasse, role];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Trouver un utilisateur par email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await pool.query(query, [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;