const { JobCategories } = require('../models');

exports.getAllJobCategories = async (req, res) => {
  try {
    const jobCategories = await JobCategories.findAll();
    res.json(jobCategories);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getJobCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobCategory = await JobCategories.findByPk(id);

    if (jobCategory) res.status(200).json(jobCategory);
    else res.status(404).json({ error: 'Job Category not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createJobCategory = async (req, res) => {
  try {
    const jobCategory = req.body;
    /* console.log(req.body); */
    const newJobCategory = await JobCategories.create(jobCategory);
    res.status(201).json(newJobCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJobCategory = async (req, res) => {
  try {
    const jobCategory = await JobCategories.findByPk(req.params.id);

    if (jobCategory) {
      const newJobCategory = req.body;

      //usage of update method directly in an instance of the Model allows not to use the where clause
      await jobCategory.update(newJobCategory);

      //calling update method directly over the Model requires use of where clause
      /* await JobCategories.update(newJobCategory, {
        where: { id: req.params.id },
      }); */
      res.status(200).json(newJobCategory);
    } else {
      res.status(404).json({ error: 'Job Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJobCategory = async (req, res) => {
  try {
    const jobCategory = await JobCategories.findByPk(req.params.id);

    if (jobCategory) {
      await jobCategory.destroy();
      res.status(200).json({ message: 'Job Category Deleted' });
    } else {
      res.status(404).json({ error: 'Job Category Not Found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
