const Appointment = require('../models/Appointment');

exports.getAllAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getAppointmentById = (req, res) => {
    Appointment.findById(req.params.appointmentId)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getAppointmentsByDoctorId = (req, res) => {
    Appointment.find({ doctorId: req.params.doctorId })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getAppointmentsByPatientId = (req, res) => {
    Appointment.find({ patientId: req.params.patientId })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};
