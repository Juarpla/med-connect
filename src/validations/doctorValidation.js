const { body } = require("express-validator");

const addDoctorRules = () => [
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

  body("specialization")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Specialization is required")
    .isString()
    .withMessage("Specialization must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Specialization must be between 2 and 50 characters"),

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
];

module.exports = addDoctorRules;
