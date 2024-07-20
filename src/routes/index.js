const router = require("express").Router();

router.use("/patients", require("./patients"));
router.use("/doctors", require("./doctors"));
router.use("/appointments", require("./appointments"));
router.use("/medical-records", require("./medicalRecords"));
router.use("/prescriptions", require("./prescriptions"));
router.use("/auth", require("./auth"));

module.exports = router;