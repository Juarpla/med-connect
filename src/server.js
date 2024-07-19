const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const medConnectRoutes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const util = require("./utils");
const app = express();

// Database Connection
mongoose.set("strictQuery", false);
initDb().catch((err) => console.log(err));
async function initDb() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
}

// Middleware
app.use(bodyParser.json());

// Serve Swagger UI at /api-docs endpoint
app.use("/", swaggerRoutes); 
// MedConnect CRUD Routes
app.use("/", medConnectRoutes);

app.use(util.handleRoteError);
app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
