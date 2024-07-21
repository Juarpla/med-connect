const { body } = require("express-validator");

const addPatientRules = () => [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("dateOfBirth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .isBefore(new Date().toISOString())
    .withMessage("Date of birth must be in the past"),

  body("gender")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Gender is required")
    .isString()
    .withMessage("Gender must be a string")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either male, female, or other"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/)
    .withMessage("Invalid phone number format. Use +X-XXX-XXX-XXXX"),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),

  body("medicalHistory")
    .isArray({ min: 1 })
    .withMessage("Medical history must be an array with at least one entry")
    .custom((value) =>
      value.every((item) => typeof item === "string" && item.trim().length > 0),
    )
    .withMessage("Each entry in medical history must be a non-empty string"),
];

module.exports = addPatientRules;
