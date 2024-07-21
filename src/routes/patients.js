const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const addPatientRules = require("../validations/patientValidation")();
const addMongoIdRules = require("../validations/mongoIdValidation")();
const checkData = require("../validations/checkDataHelper");

router.get("/", patientsController.getAllPatients);
router.get(
  "/:id",
  addMongoIdRules,
  checkData,
  patientsController.getPatientById,
);
router.post("/", addPatientRules, checkData, patientsController.createPatient);
router.put(
  "/:id",
  addMongoIdRules,
  addPatientRules,
  checkData,
  patientsController.updatePatientById,
);
router.delete(
  "/:id",
  addMongoIdRules,
  checkData,
  patientsController.deletePatientById,
);

module.exports = router;
