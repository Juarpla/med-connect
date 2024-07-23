const { body } = require("express-validator");

const addAppointmentRules = () => [
  body("patientId")
    .trim()
    .notEmpty()
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid Patient ID"),

  body("doctorId")
    .trim()
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  body("date")
    .trim()
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .isAfter(new Date().toISOString())
    .withMessage("Date must be in the future"),

  body("time")
    .trim()
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Invalid time format. Use HH:MM"),

  body("status")
    .optional()
    .isString()
    .withMessage("Status must be a string")
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Status must be either Scheduled, Completed, or Cancelled"),
];

module.exports = addAppointmentRules;
