const Patient = require("../models/Patient");

const getAllPatients = async (req, res) => {
  // #swagger.tags=["Patients"]
  // #swagger.summary = 'Retrieve all patients'
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getPatientById = async (req, res) => {
  // #swagger.tags=["Patients"]
  // #swagger.summary = 'Retrieve a patient by ID'
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const createPatient = async (req, res) => {
  // #swagger.tags=["Patients"]
  // #swagger.summary = 'Create a new patient'
  const newInput = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    medicalHistory: req.body.medicalHistory,
  };
  try {
    const newPatient = new Patient(newInput);
    await newPatient.save();
    res.status(201).json("Patient added!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePatientById = async (req, res) => {
  // #swagger.tags=["Patients"]
  // #swagger.summary = 'Update a patient by ID'
  const updatedInput = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    medicalHistory: req.body.medicalHistory,
  };
  const { id } = req.params;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedInput, {
      new: true,
    });
    if (!updatedPatient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    res.status(200).json("Patient updated!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePatientById = async (req, res) => {
  // #swagger.tags=["Patients"]
  // #swagger.summary = 'Delete a patient by ID'
  const { id } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ msg: "Patient not found" });
    }
    res.status(200).json("Patient deleted!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatientById,
  deletePatientById,
};
