const express = require('express');
const router = express.Router();
const {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDoctorId,
    getAppointmentsByPatientId,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointmentsController');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Endpoints for managing appointments
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 */
router.get('/', getAllAppointments);

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: A single appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Appointment not found
 */
router.get('/:appointmentId', getAppointmentById);

/**
 * @swagger
 * /appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments by doctor ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: A list of appointments for the doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Doctor not found or no appointments found for the doctor.
 */
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);

/**
 * @swagger
 * /appointments/patient/{patientId}:
 *   get:
 *     summary: Get appointments by patient ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The patient ID
 *     responses:
 *       200:
 *         description: A list of appointments for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found or no appointments found for the patient.
 */
router.get('/patient/:patientId', getAppointmentsByPatientId);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createAppointment);

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Appointment not found
 */
router.put('/:appointmentId', updateAppointment);

/**
 * @swagger
 * /appointments/{appointmentId}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       400:
 *         description: Bad request
  *       404:
 *         description: Appointment not found
 */
router.delete('/:appointmentId', deleteAppointment);

module.exports = router;
