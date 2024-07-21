const express = require("express");
const router = express.Router();
const isAuthenticated = require("../utils/authHelpers").isAuthenticated;
const doctorsController = require("../controllers/doctorsController");

router.get("/", doctorsController.getAllDoctors);
router.get("/:doctorId", doctorsController.getDoctorById);
router.post("/", isAuthenticated, doctorsController.createDoctor);
router.put("/:doctorId", isAuthenticated, doctorsController.updateDoctorById);
router.delete(
  "/:doctorId",
  isAuthenticated,
  doctorsController.deleteDoctorById,
);

module.exports = router;
