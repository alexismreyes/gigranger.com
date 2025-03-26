//create the mocking function
jest.mock('../../utils/sum', () => ({
  sum: jest.fn(),
}));

jest.mock('../../controllers/jobCategoriesController', () => ({
  getJobCategoryById: jest.fn(),
}));

jest.mock('../../controllers/jobsController', () => ({
  getJobById: jest.fn(),
}));

//mocking requires the import to be deestructured if not if fails
const { sum } = require('../../utils/sum'); //import after mocking, we can use a different name from the real imported method for mocking purposes however its recommended to use the same name for better readability
const {
  getJobCategoryById,
} = require('../../controllers/jobCategoriesController');
const { getJobById } = require('../../controllers/jobsController');

//tests
describe('Using mocking for testing purposes in SYNC methods', () => {
  it('Should return a preset value using mocking', () => {
    //set a fixed value to return
    sum.mockReturnValue(10);

    //no matter the arguments the result would be the same
    expect(sum(5, 15)).toBe(10);
  });

  it('Should return a value based in a mockedImplementation', () => {
    //set a fixed implementation
    sum.mockImplementation((a, b) => a * b);

    //the result is related to the mocked implementations and arguments
    expect(sum(5, 5)).toBe(25);
    expect(sum(3, 6)).toBe(18);
  });

  it('Should have been called using specific arguments', () => {
    //THE sum HOLDS THE MOCKIMPLEMENTATION FOR THE ABOVE TEST SO IT WILL MULTIPLY INSTEAD OF SUMMARIZE

    //the result is related to the mocked implementations and arguments
    expect(sum(5, 5)).toBe(25);
    expect(sum).toHaveBeenCalledWith(5, 15); //above it was used with these arguments so it passes
  });
});

describe('Using mocking for testing purposes in ASYNC methods', () => {
  it('Should resolve an async request', async () => {
    //define the resolved value
    getJobCategoryById.mockResolvedValue({ name: 'John Doe' });

    await expect(getJobCategoryById()).resolves.toEqual({
      name: 'John Doe',
    });
  });

  it('Should retrieve an specific job from jobsControllers getJobById method', async () => {
    //define the resolved value
    fakeJob = { id: 1, name: 'Software Engineer' };
    getJobById.mockResolvedValue(fakeJob);

    const result = await getJobById(1);

    expect(getJobById).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeJob);
  });

  test('getJobById throws error when job not found', async () => {
    // Simulate a failure by having the mock reject
    getJobById.mockRejectedValue(new Error('Job Not Found'));

    // Using async/await with try/catch in the test or expect(...).rejects
    await expect(getJobById(20)).rejects.toThrow('Job Not Found');
  });
});
