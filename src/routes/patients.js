const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Endpoints for managing patients
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients
 *     description: Retrieve a list of all patients.
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/', patientsController.getAllPatients);

/**
 * @swagger
 * /patients/{patientId}:
 *   get:
 *     summary: Retrieve a patient by ID
 *     description: Retrieve a specific patient by ID.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: The ID of the patient to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found.
 */
router.get('/:patientId', patientsController.getPatientById);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient record.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully.
 */
router.post('/', patientsController.createPatient);

/**
 * @swagger
 * /patients/{patientId}:
 *   put:
 *     summary: Update a patient
 *     description: Update an existing patient record.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: The ID of the patient to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully.
 *       404:
 *         description: Patient not found.
 */
router.put('/:patientId', patientsController.updatePatientById);

/**
 * @swagger
 * /patients/{patientId}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient by ID.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: The ID of the patient to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Patient deleted successfully.
 *       404:
 *         description: Patient not found.
 */
router.delete('/:patientId', patientsController.deletePatientById);

module.exports = router;