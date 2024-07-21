const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;
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
router.post(
  "/",
  isAuthenticated,
  addPatientRules,
  checkData,
  patientsController.createPatient,
);
router.put(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  addPatientRules,
  checkData,
  patientsController.updatePatientById,
);
router.delete(
  "/:id",
  isAuthenticated,
  addMongoIdRules,
  checkData,
  patientsController.deletePatientById,
);

module.exports = router;
