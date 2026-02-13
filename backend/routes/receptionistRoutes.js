const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionistController');

router.post('/', receptionistController.createReceptionist);
router.get('/', receptionistController.getAllReceptionists);
router.get('/:id', receptionistController.getReceptionistById);
router.put('/:id', receptionistController.updateReceptionist);
router.delete('/:id', receptionistController.deleteReceptionist);

module.exports = router;