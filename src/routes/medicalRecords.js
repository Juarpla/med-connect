const express = require('express');
const router = express.Router();
const medicalRecordsController = require('../controllers/medicalRecordsController');

router.get('/patient/:patientId', medicalRecordsController.getMedicalRecordsByPatient);
router.get('/:recordId', medicalRecordsController.getMedicalRecordById);

module.exports = router;
