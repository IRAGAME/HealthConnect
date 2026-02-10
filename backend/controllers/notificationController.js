const db = require('../config/db');

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifs = await db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY sent_at DESC',
      [userId]
    );
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
