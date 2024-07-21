const { body } = require("express-validator");

const addMedicalRecordRules = () => [
  body("patientId")
    .trim()
    .notEmpty()
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid Patient ID"),

  body("recordDate")
    .notEmpty()
    .withMessage("Record date is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("doctorId")
    .trim()
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID"),

  body("notes")
    .optional()
    .trim()
    .isString()
    .withMessage("Notes must be a string")
    .isLength({ max: 1000 })
    .withMessage("Notes can be up to 1000 characters long"),
];

module.exports = addMedicalRecordRules;
