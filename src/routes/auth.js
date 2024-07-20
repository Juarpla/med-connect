const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/logout", authController.logout);

module.exports = router;
