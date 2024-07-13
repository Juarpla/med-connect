const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    recordDate: { type: Date, required: true },
    description: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    notes: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
