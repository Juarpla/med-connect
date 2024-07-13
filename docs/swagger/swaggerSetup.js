const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Med-Connect',
        version: '1.0.0',
        description: 'Project for CSE 341: Web Services',
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
    tags: [
        {
            name: 'Patients',
            description: 'Endpoints for managing patients',
        },
        {
            name: 'Appointments',
            description: 'Endpoints for managing appointments',
        },
    ],
    components: {
        schemas: {
            Patient: {
                type: 'object',
                required: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phoneNumber', 'email', 'address'],
                properties: {
                    firstName: {
                        type: 'string',
                        example: 'John'
                    },
                    lastName: {
                        type: 'string',
                        example: 'Doe'
                    },
                    dateOfBirth: {
                        type: 'string',
                        format: 'date',
                        example: '1990-01-01'
                    },
                    gender: {
                        type: 'string',
                        example: 'Male'
                    },
                    phoneNumber: {
                        type: 'string',
                        example: '123-456-7890'
                    },
                    email: {
                        type: 'string',
                        example: 'john.doe@example.com'
                    },
                    address: {
                        type: 'string',
                        example: '123 Main St, Anytown, USA'
                    },
                    medicalHistory: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        example: ['Allergy to penicillin', 'Previous surgery']
                    },
                },
            },
            Appointment: {
                type: 'object',
                required: ['doctorId', 'patientId', 'date', 'time', 'reason'],
                properties: {
                    doctorId: {
                        type: 'string',
                        example: '5f8d0d55b54764421b7160d6'
                    },
                    patientId: {
                        type: 'string',
                        example: '5f8d0d55b54764421b7160d7'
                    },
                    date: {
                        type: 'string',
                        format: 'date',
                        example: '2023-12-01'
                    },
                    time: {
                        type: 'string',
                        format: 'time',
                        example: '14:30'
                    },
                    reason: {
                        type: 'string',
                        example: 'Routine check-up'
                    },
                    notes: {
                        type: 'string',
                        example: 'Patient has been experiencing mild headaches.'
                    },
                },
            },
        },
    },
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Paths to api docs
    apis: [path.join(__dirname, '../../src/routes/*.js')],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Write swaggerSpec to swagger.json file
fs.writeFileSync(path.join(__dirname, './swagger.json'), JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
