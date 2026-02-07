const pool = require('../config/db');

class Notification {
  // Créer une notification
  static async create(user_id, type, message, status = 'unread') {
    const query = `
      INSERT INTO notifications (user_id, type, message, sent_at, status) 
      VALUES ($1, , , NOW(), ) 
      RETURNING *`;
    const values = [user_id, type, message, status];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Récupérer les notifications d'un utilisateur
  static async findByUserId(user_id) {
    const query = 'SELECT * FROM notifications WHERE user_id =  ORDER BY sent_at DESC';
    
    try {
      const { rows } = await pool.query(query, [user_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Marquer comme lu
  static async markAsRead(id) {
    const query = "UPDATE notifications SET status = 'read' WHERE id =  RETURNING *";
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Notification;
