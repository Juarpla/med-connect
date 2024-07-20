const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");

router.get("/", patientsController.getAllPatients);
router.get("/:patientId", patientsController.getPatientById);
router.post("/", patientsController.createPatient);
router.put("/:patientId", patientsController.updatePatientById);
router.delete("/:patientId", patientsController.deletePatientById);

module.exports = router;
