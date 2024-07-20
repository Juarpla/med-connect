// Doctor Record Test Function
const { getDoctorById } = require('../src/controllers/doctorsController');
const doctor = require('../src/models/Doctor');
const mongoose = require('mongoose');

// Mock the Doctor model
jest.mock('../src/models/Doctor');

// Describe Doctor
describe('Doctors Controller', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('getDoctorById', () => {
    it('should return doctor by doctor ID', async () => {
      const mockDoctorRecords = [{firstName: 'Will'}, {lastName: 'Williams'}];
      doctor.find.mockResolvedValue(mockDoctorRecords);

      const req = { params: { doctorId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getDoctorById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDoctorRecords);
    });

    it('should return 404 if no doctor records found', async () => {
      doctor.find.mockResolvedValue([]);

      const req = { params: { doctorId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getDoctorById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No doctor records found' });
    });
  });
});