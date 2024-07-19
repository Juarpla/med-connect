const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");
require("dotenv").config();
const medConnectRoutes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const util = require("./utils");

const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Serve Swagger UI at /api-docs endpoint
app.use("/", swaggerRoutes); 
// Routes
app.use("/", medConnectRoutes);

app.use(util.handleRoteError);
app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
