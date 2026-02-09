const pool = require('../config/db');

class Receptionist {
  static async create(user_id) {
    const query = `INSERT INTO receptionniste (user_id) VALUES ($1) RETURNING *`;
    try {
      const { rows } = await pool.query(query, [user_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(user_id) {
    const query = 'SELECT * FROM receptionniste WHERE user_id = $1';
    try {
      const { rows } = await pool.query(query, [user_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Receptionist;