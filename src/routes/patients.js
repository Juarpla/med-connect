const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

router.get('/', patientsController.getAllPatients);
router.get('/:patientId', patientsController.getPatientById);

module.exports = router;
