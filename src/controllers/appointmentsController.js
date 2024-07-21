const Appointment = require("../models/Appointment");

const getAllAppointments = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Retrieve all appointments'
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const getAppointmentById = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Retrieve a appointment by ID'
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const getAppointmentsByDoctorId = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Retrieve a appointment by doctor ID'
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.id,
    });
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "No appointments found for the doctor" });
    }
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const getAppointmentsByPatientId = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Retrieve a appointment by patient ID'
  try {
    const appointments = await Appointment.find({
      patientId: req.params.id,
    });
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "No appointments found for the patient" });
    }
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const createAppointment = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Create a new appointment'
  const newInput = {
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    date: req.body.date,
    time: req.body.time,
    reason: req.body.reason,
    notes: req.body.notes,
  };
  try {
    const newAppointment = new Appointment(newInput);
    await newAppointment.save();
    res.status(201).json("Appointment created!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const updateAppointment = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Update a appointment by ID'
  const updatedInput = {
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    date: req.body.date,
    time: req.body.time,
    reason: req.body.reason,
    notes: req.body.notes,
  };
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updatedInput,
      { new: true },
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json("Appointment updated!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

const deleteAppointment = async (req, res) => {
  // #swagger.tags=["Appointments"]
  // #swagger.summary = 'Delete a appointment by ID'
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json("Appointment deleted!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

// Export the controller methods
module.exports = {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
