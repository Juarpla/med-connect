const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const medConnectRoutes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const util = require("./utils");
const passport = require("passport");
const responseConfig = require("./utils/responseConfig");
const authController = require("./controllers/authController");
const authHelper = require("./utils/authHelpers");
const favicon = require("serve-favicon");

const app = express();

// Database Connection
mongoose.set("strictQuery", false);
initDb().catch((err) => console.log(err));
async function initDb() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
}

// Middlewares
app.use(bodyParser.json());
app.use(authHelper.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(responseConfig.setHeaders);
app.use(authHelper.corsConfig);
app.use(favicon("public/favicon.ico"));

// Passport config
passport.use(authHelper.gitHubStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Swagger UI route
app.use("/", swaggerRoutes);
// Auth2 routes
app.get("/login", passport.authenticate("github"), authController.login);
app.get(
  "/github/callback",
  passport.authenticate("github", authHelper.failureObject),
  authController.thirdPartyAuth,
);
// MedConnect CRUD routes
app.use("/", medConnectRoutes);

// Error API Handlers
app.use(util.handleRouteError);
app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
