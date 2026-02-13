const pool = require('../config/db');

class User {
  // Créer un compte patient 
  static async create(nom, email,telephone,motdepasse) {
    const query = `
      INSERT INTO patients (nom, email, telephone, motdepasse) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [nom, email, telephone, motdepasse];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Trouver un utilisateur par email
  static async findByEmail(email) {
    const query = 'SELECT * FROM patients WHERE email = $1';
    try {
      const { rows } = await pool.query(query, [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;