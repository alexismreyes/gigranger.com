const { JobApplicationHistory } = require('../models');
const {
  notifyUserOfJobApplicationStatus,
} = require('../utils/jobApplicationNotifier');

exports.getAllJobsApplicationsHistory = async (req, res) => {
  try {
    const jobApplicationsHistory = await JobApplicationHistory.findAll();

    if (!jobApplicationsHistory || jobApplicationsHistory.length === 0)
      return res
        .status(404)
        .json({ error: 'There are no applications history recorded' });

    res.status(200).json(jobApplicationsHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobApplicationHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplicationHistory = await JobApplicationHistory.findByPk(id);

    if (jobApplicationHistory) {
      res.status(200).json(jobApplicationHistory);
    } else {
      res.status(404).json({ message: 'Job application history not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createJobApplicationHistory = async (req, res) => {
  try {
    const jobApplicationHistory = req.body;

    //  Create the history entry
    const newJobApplicationHistory = await JobApplicationHistory.create(
      jobApplicationHistory
    );

    // ✅ Notify the user via email
    await notifyUserOfJobApplicationStatus(
      jobApplicationHistory.jobAppId,
      jobApplicationHistory.updatedStatus,
      jobApplicationHistory.comment
    );

    res.status(201).json(newJobApplicationHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJobApplicationHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplicationHistory = await JobApplicationHistory.findByPk(id);

    if (jobApplicationHistory) {
      await jobApplicationHistory.update(req.body);

      res.status(200).json(jobApplicationHistory);
    } else {
      res.status(404).json({ message: 'Job Application History not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteJobApplicationHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplicationHistory = await JobApplicationHistory.findByPk(id);

    if (jobApplicationHistory) {
      await jobApplicationHistory.destroy();
      res.status(200).json({ message: 'Job application History deleted' });
    } else {
      res.status(404).json({ message: 'Job application History not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
