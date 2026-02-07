const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes: /api/notifications
router.get('/user/:userId', notificationController.getUserNotifications);
router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
