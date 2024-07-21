const express = require("express");
const router = express.Router();
const {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByDoctorId,
  getMedicalRecordsByPatientId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordsController");
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;
const addDoctorRules = require("../validations/medicalRecordsValidation")();
const addMongoIdRules = require("../validations/mongoIdValidation")();
const checkData = require("../validations/checkDataHelper");

router.get("/", getAllMedicalRecords);
router.get("/:medicalRecordId", getMedicalRecordById);
router.get("/doctor/:doctorId", getMedicalRecordsByDoctorId);
router.get("/patient/:patientId", getMedicalRecordsByPatientId);
router.post("/", isAuthenticated, createMedicalRecord);
router.put("/:medicalRecordId", isAuthenticated, updateMedicalRecord);
router.delete("/:medicalRecordId", isAuthenticated, deleteMedicalRecord);

module.exports = router;
