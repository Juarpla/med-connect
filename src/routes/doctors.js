const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');


/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Endpoints for managing doctors
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Retrieve all doctors
 *     description: Retrieve a list of all doctors.
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: A list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
 router.get('/', doctorsController.getAllDoctors);

 /**
  * @swagger
  * /doctors/{doctorId}:
  *   get:
  *     summary: Retrieve a doctor by ID
  *     description: Retrieve a specific doctor by ID.
  *     tags: [Doctors]
  *     parameters:
  *       - in: path
  *         name: doctorId
  *         required: true
  *         description: The ID of the doctor to retrieve.
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: A single doctor.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Doctor'
  *       404:
  *         description: Doctor not found.
  */
 router.get('/:doctorId', doctorsController.getDoctorById);
 
 /**
  * @swagger
  * /doctors:
  *   post:
  *     summary: Create a new doctor
  *     description: Create a new doctor record.
  *     tags: [Doctors]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Doctor'
  *     responses:
  *       201:
  *         description: Doctor created successfully.
  */
 router.post('/', doctorsController.createDoctor);
 
 /**
  * @swagger
  * /doctors/{doctorId}:
  *   put:
  *     summary: Update a doctor
  *     description: Update an existing doctor record.
  *     tags: [Doctors]
  *     parameters:
  *       - in: path
  *         name: doctorId
  *         required: true
  *         description: The ID of the doctor to update.
  *         schema:
  *           type: string
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Doctor'
  *     responses:
  *       200:
  *         description: Doctor updated successfully.
  *       404:
  *         description: Doctor not found.
  */
 router.put('/:doctorId', doctorsController.updateDoctorById);
 
 /**
  * @swagger
  * /doctors/{doctorId}:
  *   delete:
  *     summary: Delete a doctor
  *     description: Delete a doctor by ID.
  *     tags: [Doctors]
  *     parameters:
  *       - in: path
  *         name: doctorId
  *         required: true
  *         description: The ID of the doctor to delete.
  *         schema:
  *           type: string
  *     responses:
  *       204:
  *         description: Doctor deleted successfully.
  *       404:
  *         description: Doctor not found.
  */
 router.delete('/:doctorId', doctorsController.deleteDoctorById);
 
 module.exports = router;