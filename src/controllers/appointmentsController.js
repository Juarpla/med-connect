const Appointment = require('../models/Appointment');

const getAllAppointments = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const getAppointmentById = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const appointment = await Appointment.findById(req.params.appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const getAppointmentsByDoctorId = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId });
        if (appointments.length === 0) {
            return res.status(404).json({ error: 'No appointments found for the doctor' });
        }
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const getAppointmentsByPatientId = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const appointments = await Appointment.find({ patientId: req.params.patientId });
        if (appointments.length === 0) {
            return res.status(404).json({ error: 'No appointments found for the patient' });
        }
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const createAppointment = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json('Appointment created!');
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const updateAppointment = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json('Appointment updated!');
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

const deleteAppointment = async (req, res) => {
    //#swagger.tags=["Appointments"]
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json('Appointment deleted!');
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

// Export the controller methods
module.exports = {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDoctorId,
    getAppointmentsByPatientId,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
