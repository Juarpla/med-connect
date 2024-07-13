const Patient = require('../models/Patient');

// @desc    Create a new patient
// @route   POST /patients
// @access  Public
exports.createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json('Patient added!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Get all patients
// @route   GET /patients
// @access  Public
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Get a patient by ID
// @route   GET /patients/:id
// @access  Public
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) throw new Error('Patient not found');
        res.json(patient);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// @desc    Update a patient by ID
// @route   PUT /patients/:id
// @access  Public
exports.updatePatient = async (req, res) => {
    try {
        await Patient.findByIdAndUpdate(req.params.id, req.body);
        res.json('Patient updated!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Delete a patient by ID
// @route   DELETE /patients/:id
// @access  Public
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json('Patient deleted!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
