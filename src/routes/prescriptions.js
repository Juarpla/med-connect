const express = require("express");
const router = express.Router();
const prescriptionsController = require("../controllers/prescriptionsController");

router.get(
  "/patient/:patientId",
  prescriptionsController.getPrescriptionsByPatient,
);
router.get("/:prescriptionId", prescriptionsController.getPrescriptionById);

module.exports = router;
