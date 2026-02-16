// /home/ubuntu/Desktop/HealthConnect/backend/controllers/userController.js
const db = require('../config/db');

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nom, email, telephone, role FROM users ORDER BY id DESC');
    // On ajoute un statut par défaut "actif" car il n'est pas en base pour l'instant
    const usersWithStatus = result.rows.map(user => ({
      ...user,
      statut: 'actif' 
    }));
    res.json(usersWithStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // La suppression en cascade (ON DELETE CASCADE) dans la BDD devrait gérer les tables liées (docteur, admin, etc.)
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
