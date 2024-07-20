const express = require("express");
const router = express.Router();
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
router.post("/", createAppointment);
router.put("/:appointmentId", updateAppointment);
router.delete("/:appointmentId", deleteAppointment);

module.exports = router;
