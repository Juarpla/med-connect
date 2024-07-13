const Patient = require('../models/Patient');

/**
 * Controller function to get all patients.
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients
 *     description: Retrieves a list of all patients.
 *     responses:
 *       '200':
 *         description: A JSON array of patient objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'  // Reference to your Patient schema
 *       '500':
 *         description: Server error.
 */
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

/**
 * Controller function to get a patient by ID.
 * @swagger
 * /patients/{patientId}:
 *   get:
 *     summary: Retrieve a patient by ID
 *     description: Retrieves a patient based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object of the patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'  // Reference to your Patient schema
 *       '404':
 *         description: Patient not found.
 */
const getPatientById = async (req, res) => {
    const { patientId } = req.params;
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

/**
 * Controller function to create a new patient.
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: Creates a new patient record based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'  // Reference to your Patient schema
 *     responses:
 *       '201':
 *         description: Successfully created a new patient.
 *       '400':
 *         description: Invalid request body or missing required fields.
 *       '500':
 *         description: Server error.
 */
const createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json('Patient added!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Controller function to update a patient by ID.
 * @swagger
 * /patients/{patientId}:
 *   put:
 *     summary: Update a patient by ID
 *     description: Updates a patient record based on the provided ID and data.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'  // Reference to your Patient schema
 *     responses:
 *       '200':
 *         description: Successfully updated the patient.
 *       '400':
 *         description: Invalid request body or missing required fields.
 *       '404':
 *         description: Patient not found.
 *       '500':
 *         description: Server error.
 */
const updatePatientById = async (req, res) => {
    const { patientId } = req.params;
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(patientId, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        res.status(200).json('Patient updated!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * Controller function to delete a patient by ID.
 * @swagger
 * /patients/{patientId}:
 *   delete:
 *     summary: Delete a patient by ID
 *     description: Deletes a patient record based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the patient.
 *       '404':
 *         description: Patient not found.
 *       '500':
 *         description: Server error.
 */
const deletePatientById = async (req, res) => {
    const { patientId } = req.params;
    try {
        const deletedPatient = await Patient.findByIdAndDelete(patientId);
        if (!deletedPatient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        res.status(200).json('Patient deleted!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatientById,
    deletePatientById
};
