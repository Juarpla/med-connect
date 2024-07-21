// Doctor Record Test Function
const { getDoctorById } = require("../src/controllers/doctorsController");
const Doctor = require("../src/models/Doctor");
const mongoose = require("mongoose");

// Mock the Doctor model
jest.mock("../src/models/Doctor");

// Describe Doctor
describe("Doctors Controller", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe("getDoctorById", () => {
    it("should return doctor by doctor ID", async () => {
      const mockDoctorRecords = {
        doctorId: "777",
        firstName: "Test",
        lastName: "Test",
        specialization: "Test",
        phoneNumber: "Test",
        email: "Test",
        address: "Test"
      }

      Doctor.findById.mockResolvedValue(mockDoctorRecords);

      const req = { params: "777" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getDoctorById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockDoctorRecords);
    });

    it("should return 404 if no doctor records found", async () => {
      Doctor.findById.mockResolvedValue([]);

      const req = { params: "777" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getDoctorById(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
