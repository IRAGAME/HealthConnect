const db = require('../config/db');

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.query;

  try {
    let query = 'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC';

    if (role === 'patient') {
      // Pour les patients, on récupère les notifications où patient_id correspond
      // et user_id est NULL (pour exclure les notifications destinées aux admins à propos de ce patient)
      query = 'SELECT * FROM notifications WHERE patient_id = $1 AND user_id IS NULL ORDER BY sent_at DESC';
    }

    const notifs = await db.query(query, [userId]);
    res.json(notifs.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE notifications SET status = 'lu' WHERE id = $1", [id]);
    res.json({ message: "Notification marquée comme lue" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
