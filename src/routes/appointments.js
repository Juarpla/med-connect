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
const addAppointmentRules = require("../validations/appointmentValidation")();
const addMongoIdRules = require("../validations/mongoIdValidation")();
const checkData = require("../validations/checkDataHelper");

router.get("/", getAllAppointments);
router.get("/:id", addMongoIdRules, checkData, getAppointmentById);
router.get(
  "/doctor/:id",
  addMongoIdRules,
  checkData,
  getAppointmentsByDoctorId,
);
router.get(
  "/patient/:id",
  addMongoIdRules,
  checkData,
  getAppointmentsByPatientId,
);
router.post(
  "/",
  isAuthenticated,
  addAppointmentRules,
  checkData,
  createAppointment,
);
router.put(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  addAppointmentRules,
  checkData,
  updateAppointment,
);
router.delete(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  checkData,
  deleteAppointment,
);

module.exports = router;
