const { Companies } = require('../models');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Companies.findByPk(id);

    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = req.body;
    const newCompany = await Companies.create(company);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Companies.findByPk(id);

    if (company) {
      await company.update(req.body);
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Companies.findByPk(id);

    if (company) {
      await company.destroy();
      res.status(200).json({ message: 'Company deleted' });
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
