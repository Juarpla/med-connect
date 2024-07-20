// Appointment Test Function
const {
  getAppointmentsByDoctorId,
} = require("../src/controllers/appointmentsController");
const Appointment = require("../src/models/Appointment");
const mongoose = require("mongoose");

// Mock the Appointment model
jest.mock("../src/models/Appointment");

describe("Appointments Controller", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe("getAppointmentsByDoctorId", () => {
    it("should return appointments by doctor ID", async () => {
      const mockAppointments = [{ date: "2023-07-18" }, { date: "2023-07-19" }];
      Appointment.find.mockResolvedValue(mockAppointments);

      const req = { params: { doctorId: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAppointmentsByDoctorId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
    });

    it("should return 404 if no appointments found", async () => {
      Appointment.find.mockResolvedValue([]);

      const req = { params: { doctorId: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAppointmentsByDoctorId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No appointments found for the doctor",
      });
    });
  });
});
