const Doctor = require('../models/Doctor');


/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Retrieve all doctors
 *     description: Retrieves a list of all doctors.
 *     responses:
 *       '200':
 *         description: A JSON array of doctor objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       '500':
 *         description: Server error.
 */
 const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

/**
 * @swagger
 * /doctors/{doctorId}:
 *   get:
 *     summary: Retrieve a doctor by ID
 *     description: Retrieves a doctor based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object of the doctor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       '404':
 *         description: Doctor not found.
 */
const getDoctorById = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctors = await Doctor.findById(doctorId);
        if (!doctors) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.status(200).json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Creates a new doctor record based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       '201':
 *         description: Successfully created a new doctor.
 *       '400':
 *         description: Invalid request body or missing required fields.
 *       '500':
 *         description: Server error.
 */
const createDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json('Doctor added!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @swagger
 * /doctors/{doctorId}:
 *   put:
 *     summary: Update a doctor by ID
 *     description: Updates a doctor record based on the provided ID and data.
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       '200':
 *         description: Successfully updated the doctor.
 *       '400':
 *         description: Invalid request body or missing required fields.
 *       '404':
 *         description: Doctor not found.
 *       '500':
 *         description: Server error.
 */
const updateDoctorById = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.status(200).json('Doctor updated!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @swagger
 * /doctors/{doctorId}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     description: Deletes a doctor record based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the doctor.
 *       '404':
 *         description: Doctor not found.
 *       '500':
 *         description: Server error.
 */
const deleteDoctorById = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
        if (!deletedDoctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.status(200).json('Doctor deleted!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctorById,
    deleteDoctorById
};
