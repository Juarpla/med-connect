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

router.get("/", getAllMedicalRecords);
router.get("/:medicalRecordId", getMedicalRecordById);
router.get("/doctor/:doctorId", getMedicalRecordsByDoctorId);
router.get("/patient/:patientId", getMedicalRecordsByPatientId);
router.post("/", createMedicalRecord);
router.put("/:medicalRecordId", updateMedicalRecord);
router.delete("/:medicalRecordId", deleteMedicalRecord);

module.exports = router;
