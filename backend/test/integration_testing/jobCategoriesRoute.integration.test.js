const request = require('supertest');
const express = require('express');
const jobCategoriesRoute = require('../../routes/jobCategoriesRoute');

// 1) Mock the auth middleware to always authorize requests
jest.mock('../../middlewares/authMiddleware', () => ({
  verifyToken: (req, res, next) => {
    req.user = { userId: 1, role: 'admin' };
    next();
  },
}));

// 2) Mock the JobCategories model methods
const { JobCategories } = require('../../models');
jest.mock('../../models');

describe('Integration tests for /api/v1/jobcategories', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/jobcategories', jobCategoriesRoute);
  });

  describe('GET /api/v1/jobcategories', () => {
    it('should return all job categories', async () => {
      const fakeCategories = [
        { id: 1, name: 'IT' },
        { id: 2, name: 'HR' },
      ];
      JobCategories.findAll.mockResolvedValue(fakeCategories);

      const res = await request(app).get('/api/v1/jobcategories');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeCategories);
    });

    it('should return 400 on error', async () => {
      JobCategories.findAll.mockRejectedValue(new Error('Test error'));

      const res = await request(app).get('/api/v1/jobcategories');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Test error');
    });
  });

  describe('GET /api/v1/jobcategories/:id', () => {
    it('should return a job category by id', async () => {
      const fakeCategory = { id: 1, name: 'IT' };
      JobCategories.findByPk.mockResolvedValue(fakeCategory);

      const res = await request(app).get('/api/v1/jobcategories/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeCategory);
    });

    it('should return 404 if job category not found', async () => {
      JobCategories.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/v1/jobcategories/1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Job Category not found');
    });

    it('should return 400 on error', async () => {
      JobCategories.findByPk.mockRejectedValue(new Error('Test error'));

      const res = await request(app).get('/api/v1/jobcategories/1');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Test error');
    });
  });

  describe('POST /api/v1/jobcategories', () => {
    it('should create a new job category', async () => {
      const newCategory = { name: 'Finance' };
      const createdCategory = { id: 3, name: 'Finance' };
      JobCategories.create.mockResolvedValue(createdCategory);

      const res = await request(app)
        .post('/api/v1/jobcategories')
        .send(newCategory);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdCategory);
    });

    it('should return 400 on error', async () => {
      JobCategories.create.mockRejectedValue(new Error('Test error'));

      const res = await request(app)
        .post('/api/v1/jobcategories')
        .send({ name: 'Finance' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Test error');
    });
  });

  describe('PUT /api/v1/jobcategories/:id', () => {
    it('should update an existing job category', async () => {
      const fakeCategory = {
        id: 1,
        name: 'IT',
        update: jest.fn().mockResolvedValue(),
      };
      JobCategories.findByPk.mockResolvedValue(fakeCategory);

      const updatedData = { name: 'Information Technology' };
      const res = await request(app)
        .put('/api/v1/jobcategories/1')
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(fakeCategory.update).toHaveBeenCalledWith(updatedData);
      expect(res.body).toEqual(updatedData);
    });

    it('should return 404 if job category not found', async () => {
      JobCategories.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/v1/jobcategories/1')
        .send({ name: 'New Name' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Job Category not found');
    });

    it('should return 400 on error', async () => {
      JobCategories.findByPk.mockRejectedValue(new Error('Test error'));

      const res = await request(app)
        .put('/api/v1/jobcategories/1')
        .send({ name: 'New Name' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Test error');
    });
  });

  describe('DELETE /api/v1/jobcategories/:id', () => {
    it('should delete an existing job category', async () => {
      const fakeCategory = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(),
      };
      JobCategories.findByPk.mockResolvedValue(fakeCategory);

      const res = await request(app).delete('/api/v1/jobcategories/1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Job Category Deleted');
      expect(fakeCategory.destroy).toHaveBeenCalled();
    });

    it('should return 404 if job category not found', async () => {
      JobCategories.findByPk.mockResolvedValue(null);

      const res = await request(app).delete('/api/v1/jobcategories/1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Job Category Not Found');
    });

    it('should return 400 on error', async () => {
      JobCategories.findByPk.mockRejectedValue(new Error('Test error'));

      const res = await request(app).delete('/api/v1/jobcategories/1');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Test error');
    });
  });
});
