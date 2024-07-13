const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');

router.get('/', doctorsController.getAllDoctors);
router.get('/:doctorId', doctorsController.getDoctorById);

module.exports = router;
