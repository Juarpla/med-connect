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
const addMedicalRecordRules =
  require("../validations/medicalRecordsValidation")();
const addMongoIdRules = require("../validations/mongoIdValidation")();
const checkData = require("../validations/checkDataHelper");

router.get("/", getAllMedicalRecords);
router.get("/:id", addMongoIdRules, checkData, getMedicalRecordById);
router.get(
  "/doctor/:id",
  addMongoIdRules,
  checkData,
  getMedicalRecordsByDoctorId,
);
router.get(
  "/patient/:id",
  addMongoIdRules,
  checkData,
  getMedicalRecordsByPatientId,
);
router.post(
  "/",
  isAuthenticated,
  addMedicalRecordRules,
  checkData,
  createMedicalRecord,
);
router.put(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  addMedicalRecordRules,
  checkData,
  updateMedicalRecord,
);
router.delete(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  checkData,
  deleteMedicalRecord,
);

module.exports = router;
