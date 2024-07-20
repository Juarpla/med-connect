// Patient Record Test Function
const { getAllPatients, getPatientById } = require('../src/controllers/patientsController');
const patient = require('../src/models/Patient');
const mongoose = require('mongoose');

// Mock the Patient model
jest.mock('../src/models/Patient');

// Describe Patient
describe('Patients Controller', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('getPatientById', () => {
    it('should return patient by patient ID', async () => {
      const mockPatientRecords = [{firstName: 'Will'}, {lastName: 'Williams'}];
      patient.find.mockResolvedValue(mockPatientRecords);

      const req = { params: { patientId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getPatientById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPatientRecords);
    });

    it('should return 404 if no patient records found', async () => {
      patient.find.mockResolvedValue([]);

      const req = { params: { patientId: '777' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getPatientById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No patient records found' });
    });
  });
});