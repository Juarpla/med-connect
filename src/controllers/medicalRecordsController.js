const MedicalRecord = require("../models/MedicalRecord");

exports.getAllMedicalRecords = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  try {
    const medicalRecords = await MedicalRecord.find();
    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.getMedicalRecordsByDoctorId = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  try {
    const medicalRecords = await MedicalRecord.find({
      doctorId: req.params.doctorId,
    });
    if (medicalRecords.length === 0) {
      return res
        .status(404)
        .json({ error: "No Medical Records found for the doctor" });
    }
    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.getMedicalRecordsByPatientId = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  try {
    const medicalRecords = await MedicalRecord.find({
      patientId: req.params.patientId,
    });
    if (medicalRecords.length === 0) {
      return res
        .status(404)
        .json({ error: "No Medical Records found for the patient" });
    }
    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.getMedicalRecordById = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  try {
    const medicalRecord = await MedicalRecord.findById(
      req.params.medicalRecordId,
    );
    if (!medicalRecord) {
      return res.status(404).json({ error: "Medical Record not found" });
    }
    res.status(200).json(medicalRecord);
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.createMedicalRecord = async (req, res) => {
  //#swagger.tags=["MedicalRecords"]
  const newInput = {
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    recordDate: req.body.recordDate,
    description: req.body.description,
    notes: req.body.notes,
  };
  try {
    const newMedicalRecord = new MedicalRecord(newInput);
    await newMedicalRecord.save();
    res.status(201).json("MedicalRecord created!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.updateMedicalRecord = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  const updatedInput = {
    doctorId: req.body.doctorId,
    medicalRecordId: req.body.medicalRecordId,
    patientId: req.body.patientId,
    recordDate: req.body.recordDate,
    description: req.body.description,
    notes: req.body.notes,
  };
  try {
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.medicalRecordId,
      updatedInput,
      { new: true },
    );
    if (!updatedMedicalRecord) {
      return res.status(404).json({ error: "Medical Record not found" });
    }
    res.status(200).json("Medical Record updated!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};

exports.deleteMedicalRecord = async (req, res) => {
  // #swagger.tags=["MedicalRecords"]
  try {
    const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(
      req.params.medicalRecordId,
    );
    if (!deletedMedicalRecord) {
      return res.status(404).json({ error: "Medical Record not found" });
    }
    res.status(200).json("Medical Record deleted!");
  } catch (err) {
    res.status(400).json({ error: "Error: " + err });
  }
};
