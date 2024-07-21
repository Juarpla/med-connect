const Doctor = require('../models/Doctor');

// Create a new doctor
const createDoctor = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Create a new doctor'
  const newDoctor = {
    doctorid: req.body.doctorid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    specialization: req.body.specialization,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
  };
  try {
    const doctor = new Doctor(newDoctor);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Retrieve all doctors'
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Retrieve a doctor by ID'
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update a doctor by ID
const updateDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Update a doctor by ID'
  const updatedDoctor = {
    doctorid: req.body.doctorid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    specialization: req.body.specialization,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
  };
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true, runValidators: true });
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a doctor by ID
const deleteDoctorById = async (req, res) => {
  // #swagger.tags=["Doctor"]
  // #swagger.summary = 'Delete a doctor by ID'
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById
};
