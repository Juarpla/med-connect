const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

router.get('/', appointmentsController.getAllAppointments);
router.get('/:appointmentId', appointmentsController.getAppointmentById);
router.get('/doctor/:doctorId', appointmentsController.getAppointmentsByDoctor);
router.get('/patient/:patientId', appointmentsController.getAppointmentsByPatient);

module.exports = router;
