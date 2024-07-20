// Medical Record Test Function
const { getMedicalRecordsByPatient, getMedicalRecordById } = require('../src/controllers/medicalRecordsController');
const medicalRecord = require('../src/models/MedicalRecord');
const mongoose = require('mongoose');

// Mock the Medical Record model
jest.mock('../src/models/MedicalRecord');

// Describe Medical Record By Patient
describe('Medical Records Controller', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('getMedicalRecordsByPatient', () => {
    it('should return medical records by patient ID', async () => {
      const mockMedicalRecords = [{recordDate: '2024-01-01'}];
      medicalRecord.find.mockResolvedValue(mockMedicalRecords);

      const req = { params: { patientId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordsByPatient(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMedicalRecords);
    });

    it('should return 404 if no medical records found', async () => {
      medicalRecord.find.mockResolvedValue([]);

      const req = { params: { patientId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordsByPatient(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No medical records found' });
    });
  });
});

// Describe Medical Record By Id
describe('Medical Records Controller', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('getMedicalRecordById', () => {
    it('should return medical records by ID', async () => {
      const mockMedicalRecords = [{recordDate: '2024-01-01'}];
      medicalRecord.find.mockResolvedValue(mockMedicalRecords);

      const req = { params: { recordId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMedicalRecords);
    });

    it('should return 404 if no medical records found', async () => {
      medicalRecord.find.mockResolvedValue([]);

      const req = { params: { recordId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMedicalRecordById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No medical records found' });
    });
  });
});