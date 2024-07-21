// Patient Record Test Function
const { getPatientById } = require("../src/controllers/patientsController");
const Patient = require("../src/models/Patient");
const mongoose = require("mongoose");

// Mock the Patient model
jest.mock("../src/models/Patient");

// Describe Patient
describe("Patients Controller", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe("getPatientById", () => {
    it("should return patient by patient ID", async () => {
      const mockPatientRecords = {
      firstName: "Test",
      lastName: "Test",
      dateOfBirth: "Test",
      gender: "Test",
      phoneNumber: "Test",
      email: "Test",
      address: "Test",
      medicalHistory: ["Test"]
    }

      Patient.findById.mockResolvedValue(mockPatientRecords);

      const req = { params: "Test" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getPatientById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPatientRecords);
    });

    it("should return 404 if no patient records found", async () => {
      Patient.findById.mockResolvedValue([]);

      const req = { params:"777" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getPatientById(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});