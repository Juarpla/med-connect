const Patient = require('../models/Patient');

const getAllPatients = async (req, res) => {
    //#swagger.tags=["Patients"]
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const getPatientById = async (req, res) => {
    //#swagger.tags=["Patients"]
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

const createPatient = async (req, res) => {
    //#swagger.tags=["Patients"]
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json('Patient added!');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePatientById = async (req, res) => {
    //#swagger.tags=["Patients"]
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

const deletePatientById = async (req, res) => {
    //#swagger.tags=["Patients"]
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
