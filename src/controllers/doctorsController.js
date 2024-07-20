const Doctor = require("../models/Doctor");

// Controller methods
exports.getAllDoctors = (req, res) => {
  //#swagger.tags=["Doctors"]
  Doctor.find()
    .then((doctors) => res.json(doctors))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getDoctorById = (req, res) => {
  //#swagger.tags=["Doctors"]
  Doctor.findById(req.params.doctorId)
    .then((doctor) => res.json(doctor))
    .catch((err) => res.status(400).json("Error: " + err));
};
