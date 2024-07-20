const MedicalRecord = require('../models/MedicalRecord');

// Controller methods
exports.getMedicalRecordsByPatient = (req, res) => {
    //#swagger.tags=["MedicalRecords"]
    MedicalRecord.find({ patientId: req.params.patientId })
        .then(records => res.json(records))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.getMedicalRecordById = (req, res) => {
    //#swagger.tags=["MedicalRecords"]
    MedicalRecord.findById(req.params.recordId)
        .then(record => res.json(record))
        .catch(err => res.status(400).json('Error: ' + err));
};
