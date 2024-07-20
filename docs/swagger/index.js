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
    description:
      "The MedConnect API will provide a comprehensive system for managing medical appointments and patient information",
    version: "1.0.0",
  },
  securityDefinitions: {
    oauth2: {
      type: "oauth2",
      description:
        "When you click “Authorize”, you will be redirected to a website where you can log in through a third-party service.",
      authorizationUrl: process.env.CALLBACK_URL,
      flow: "redirectLink",
    },
  },
  host: host,
  schemes: schemes,
};

const outputFile = "./docs/swagger/swagger.json";
const endpointsFile = ["../src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
