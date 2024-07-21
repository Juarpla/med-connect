// Medical Record Test Function
const { getMedicalRecordById } = require('../src/controllers/medicalRecordsController');
const MedicalRecord = require('../src/models/MedicalRecord');
const mongoose = require('mongoose');

// Mock the Medical Record model
jest.mock('../src/models/MedicalRecord');

// Describe Medical Record By Id
describe('Medical Records Controller', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('getMedicalRecordById', () => {
    it('should return medical records by ID', async () => {
      const mockMedicalRecords = [{recordDate: '2024-01-01'}];
      MedicalRecord.findById.mockResolvedValue(mockMedicalRecords);

      const req = { params: '777' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockMedicalRecords);
    });

    it('should return 404 if no medical records found', async () => {
      MedicalRecord.findById.mockResolvedValue([]);

      const req = { params: '777' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordById(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});