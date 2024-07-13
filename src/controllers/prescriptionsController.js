const Prescription = require('../models/Prescription');

// Controller methods
exports.getPrescriptionsByPatient = (req, res) => {
    Prescription.find({ patientId: req.params.patientId })
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getPrescriptionById = (req, res) => {
    Prescription.findById(req.params.prescriptionId)
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json('Error: ' + err));
};
