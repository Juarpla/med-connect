const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;

router.get("/", patientsController.getAllPatients);
router.get("/:patientId", patientsController.getPatientById);
router.post(
    "/",
    isAuthenticated,
    patientsController.createPatient
);
router.put(
    "/:patientId",
    isAuthenticated,
    patientsController.updatePatientById
);
router.delete(
    "/:patientId",
    isAuthenticated,
    patientsController.deletePatientById
);

module.exports = router;
