const express = require("express");
const router = express.Router();
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;
const {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentsController");

router.get("/", getAllAppointments);
router.get("/:appointmentId", getAppointmentById);
router.get("/doctor/:doctorId", getAppointmentsByDoctorId);
router.get("/patient/:patientId", getAppointmentsByPatientId);
router.post("/", isAuthenticated, createAppointment);
router.put("/:appointmentId", isAuthenticated, updateAppointment);
router.delete("/:appointmentId", isAuthenticated, deleteAppointment);

module.exports = router;
