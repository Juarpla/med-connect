const Appointment = require('../models/Appointment');

// Controller methods
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

exports.createAppointment = (req, res) => {
    const newAppointment = new Appointment(req.body);
    newAppointment.save()
        .then(() => res.json('Appointment created!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateAppointment = (req, res) => {
    Appointment.findByIdAndUpdate(req.params.appointmentId, req.body)
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.deleteAppointment = (req, res) => {
    Appointment.findByIdAndDelete(req.params.appointmentId)
        .then(() => res.json('Appointment deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
};