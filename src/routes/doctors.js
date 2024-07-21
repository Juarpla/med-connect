const express = require('express');
const router = express.Router();
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;
const doctorsController = require('../controllers/doctorsController');
const addDoctorRules = require("../validations/doctorValidation")();
const addMongoIdRules = require("../validations/mongoIdValidation")();
const checkData = require("../validations/checkDataHelper");

router.get("/", doctorsController.getAllDoctors);
router.get("/:Id", addMongoIdRules, checkData,doctorsController.getDoctorById);
router.post("/", isAuthenticated, addDoctorRules, checkData, doctorsController.createDoctor);
router.put("/:Id", isAuthenticated, addMongoIdRules, addDoctorRules, checkData,doctorsController.updateDoctorById);
router.delete("/:Id", isAuthenticated, addMongoIdRules, checkData,doctorsController.deleteDoctorById);

module.exports = router;