// c:\Users\mugis\Desktop\HealthConnect\backend\routes\adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Idéalement, vous devriez ajouter un middleware d'authentification et d'autorisation ici
// pour s'assurer que seul un utilisateur autorisé (ex: un autre admin) peut effectuer ces actions.

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;