const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const host =
  process.env.NODE_ENV === "production"
    ? "med-connect-xf6a.onrender.com"
    : "localhost:8080";

const schemes = process.env.NODE_ENV === "production" ? ["https"] : ["http"];

// Swagger doc
const doc = {
  info: {
    title: "Med-Connect",
    description: "Project for CSE 341: Web Services .",
    version: "1.0.0",
  },
  host: host,
  schemes: schemes,
};

const outputFile = "./docs/swagger/swagger.json";
const endpointsFile = ["../src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
