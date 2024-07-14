const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger/swaggerSetup');
const swaggerSetup = require('./swagger');
require('dotenv').config();
const util = require("./utils");

const app = express();

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
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
