const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger/swaggerSetup');
const swaggerSetup = require('./swagger');
require('dotenv').config();
const util = require("./utils");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const responseConfig = require("./utils/responseConfig");
const authController = require("./controllers/authController");
const authHelper = require("./utils/authHelpers");

const app = express();

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(bodyParser.json());
app.use(authHelper.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(responseConfig.setHeaders);
app.use(authHelper.corsConfig);

// Database Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//passport config
passport.use(authHelper.gitHubStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get("/login", passport.authenticate("github"), authController.login);
app.get(
  "/github/callback",
  passport.authenticate("github", authHelper.failureObject),
  authController.thirdPartyAuth
);
app.get("/", (req, res) => {
  //#swagger.tags=["Home"]
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out",
  );
});
app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medical-records', require('./routes/medicalRecords'));
app.use('/prescriptions', require('./routes/prescriptions'));
app.use('/auth', require('./routes/auth'));

app.use(util.handleRoteError);
app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
