const pool = require('../config/db');

class Admin {
  static async create(user_id) {
    const query = `INSERT INTO admin (user_id) VALUES ($1) RETURNING *`;
    try {
      const { rows } = await pool.query(query, [user_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(user_id) {
    const query = "SELECT * FROM admin WHERE user_id = const pool = require('../config/db')";
    
    class Admin {
      static async create(user_id) {
        const query = `INSERT INTO admin (user_id) VALUES ($1) RETURNING *`;
        try {
          const { rows } = await pool.query(query, [user_id]);
          return rows[0];
        } catch (error) {
          throw error;
        }
      }
    
      static async findByUserId(user_id) {
        const query = 'SELECT * FROM admin WHERE user_id = ';
        try {
          const { rows } = await pool.query(query, [user_id]);
          return rows[0];
        } catch (error) {
          throw error;
        }
      }
    }
    
    module.exports = Admin;
    
    try {
      const { rows } = await pool.query(query, [user_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Admin;
