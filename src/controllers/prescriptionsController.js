const Prescription = require('../models/Prescription');

// Controller methods
exports.getPrescriptionsByPatient = (req, res) => {
    //#swagger.tags=["Prescriptions"]
    Prescription.find({ patientId: req.params.patientId })
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getPrescriptionById = (req, res) => {
    //#swagger.tags=["Prescriptions"]
    Prescription.findById(req.params.prescriptionId)
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json('Error: ' + err));
};
