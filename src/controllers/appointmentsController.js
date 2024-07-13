const Appointment = require('../models/Appointment');

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve a list of all appointments.
 *     responses:
 *       200:
 *         description: A list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 */
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   get:
 *     summary: Get appointment by ID
 *     description: Retrieve a single appointment by its ID.
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID.
 *     responses:
 *       200:
 *         description: A single appointment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Appointment not found.
 */
const getAppointmentById = async (req, res) => {
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

/**
 * @swagger
 * /appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments by doctor ID
 *     description: Retrieve a list of appointments for a specific doctor.
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The doctor ID.
 *     responses:
 *       200:
 *         description: A list of appointments for the doctor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Doctor not found or no appointments found for the doctor.
 */
const getAppointmentsByDoctorId = async (req, res) => {
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

/**
 * @swagger
 * /appointments/patient/{patientId}:
 *   get:
 *     summary: Get appointments by patient ID
 *     description: Retrieve a list of appointments for a specific patient.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The patient ID.
 *     responses:
 *       200:
 *         description: A list of appointments for the patient.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Patient not found or no appointments found for the patient.
 */
const getAppointmentsByPatientId = async (req, res) => {
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

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *       400:
 *         description: Bad request.
 */
const createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json('Appointment created!');
    } catch (err) {
        res.status(400).json({ error: 'Error: ' + err });
    }
};

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   put:
 *     summary: Update an appointment
 *     description: Update an appointment with the provided data.
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Appointment not found
 */
const updateAppointment = async (req, res) => {
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

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete an appointment by its ID.
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID.
 *     responses:
 *       200:
 *         description: Appointment deleted successfully.
 *       400:
 *         description: Bad request.
  *       404:
 *         description: Appointment not found
 */
const deleteAppointment = async (req, res) => {
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
