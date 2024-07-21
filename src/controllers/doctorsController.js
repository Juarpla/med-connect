const Doctor = require("../models/doctor");

// Create a new doctor
const createDoctor = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Create New Doctor'
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Get All Doctors'
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Get Doctor By ID'
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a doctor by ID
const updateDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Update Doctor by ID'
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a doctor by ID
const deleteDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Delete Doctor by ID'
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};
