const { Status } = require('../models');

exports.getAllStatus = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
