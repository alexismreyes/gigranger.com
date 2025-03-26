//UNIT TESTS FOR CONTROLLERS

const {
  getAllJobCategories,
  getJobCategoryById,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,
} = require('../../controllers/JobCategoriesController');
const { JobCategories } = require('../../models');

jest.mock('../../models'); //this tells jest to mock the models

//a helper function to create a mock response object
const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('jobCategoriesController', () => {
  describe('getAllJobCategories', () => {
    it('Should return job categories when found', async () => {
      //Arrange
      const fakeJobCategories = [
        { id: 1, name: 'Electronics', description: 'XXX' },
        { id: 2, name: 'Furniture', description: 'YYY' },
      ];
      JobCategories.findAll.mockResolvedValue(fakeJobCategories);
      const req = {};
      const res = createRes();

      //Act
      await getAllJobCategories(req, res);

      //Assert
      expect(JobCategories.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeJobCategories);
    });

    it('Should handle errors and return status 400', async () => {
      //ARRANGE
      const errorMessage = 'Database error';
      JobCategories.findAll.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = createRes();

      //ACT
      await getAllJobCategories(req, res);

      //ASSERT
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getJobCategoryById', () => {
    it('Should return a job Category when found', async () => {
      //ARRANGE
      const fakeCategory = { id: 1, name: 'Furniture' };
      JobCategories.findByPk.mockResolvedValue(fakeCategory);
      const req = { params: { id: '1' } };
      const res = createRes();

      //ACT
      await getJobCategoryById(req, res);

      //ASSERT
      expect(JobCategories.findByPk).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeCategory);
    });

    it('should return 404 if job category is not found', async () => {
      // Arrange
      JobCategories.findByPk.mockResolvedValue(null);
      const req = { params: { id: '1' } };
      const res = createRes();

      // Act
      await getJobCategoryById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Job Category not found',
      });
    });

    it('should handle errors and return status 400', async () => {
      // Arrange
      const errorMessage = 'Database error';
      JobCategories.findByPk.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: '1' } };
      const res = createRes();

      // Act
      await getJobCategoryById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('createJobCategory', () => {
    it('should create a job category and return it', async () => {
      // Arrange
      const newJobCategoryData = { name: 'Finance' };
      const createdJobCategory = { id: 3, name: 'Finance' };
      JobCategories.create.mockResolvedValue(createdJobCategory);
      const req = { body: newJobCategoryData };
      const res = createRes();

      // Act
      await createJobCategory(req, res);

      // Assert
      expect(JobCategories.create).toHaveBeenCalledWith(newJobCategoryData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdJobCategory);
    });

    it('should handle errors and return status 400', async () => {
      // Arrange
      const errorMessage = 'Validation error';
      JobCategories.create.mockRejectedValue(new Error(errorMessage));
      const req = { body: { name: 'Invalid Data' } };
      const res = createRes();

      // Act
      await createJobCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateJobCategory', () => {
    it('should update the job category if found', async () => {
      // Arrange
      const existingJobCategory = {
        id: 1,
        name: 'IT',
        update: jest.fn().mockResolvedValue(),
      };
      JobCategories.findByPk.mockResolvedValue(existingJobCategory);
      const updatedData = { name: 'Information Technology' };
      const req = { params: { id: '1' }, body: updatedData };
      const res = createRes();

      // Act
      await updateJobCategory(req, res);

      // Assert
      expect(JobCategories.findByPk).toHaveBeenCalledWith('1');
      expect(existingJobCategory.update).toHaveBeenCalledWith(updatedData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedData);
    });

    it('should return 404 if job category is not found', async () => {
      // Arrange
      JobCategories.findByPk.mockResolvedValue(null);
      const req = { params: { id: '1' }, body: { name: 'New Name' } };
      const res = createRes();

      // Act
      await updateJobCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Job Category not found',
      });
    });

    it('should handle errors and return status 400', async () => {
      // Arrange
      const errorMessage = 'Update failed';
      JobCategories.findByPk.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: '1' }, body: { name: 'New Name' } };
      const res = createRes();

      // Act
      await updateJobCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteJobCategory', () => {
    it('should delete the job category if found', async () => {
      // Arrange
      const jobCategoryInstance = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(),
      };
      JobCategories.findByPk.mockResolvedValue(jobCategoryInstance);
      const req = { params: { id: '1' } };
      const res = createRes();

      // Act
      await deleteJobCategory(req, res);

      // Assert
      expect(JobCategories.findByPk).toHaveBeenCalledWith('1');
      expect(jobCategoryInstance.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Job Category Deleted',
      });
    });

    it('should return 404 if job category is not found', async () => {
      // Arrange
      JobCategories.findByPk.mockResolvedValue(null);
      const req = { params: { id: '1' } };
      const res = createRes();

      // Act
      await deleteJobCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Job Category Not Found',
      });
    });

    it('should handle errors and return status 400', async () => {
      // Arrange
      const errorMessage = 'Deletion failed';
      JobCategories.findByPk.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: '1' } };
      const res = createRes();

      // Act
      await deleteJobCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
