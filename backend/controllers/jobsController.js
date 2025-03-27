const { Jobs, JobApplication } = require('../models');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll();
    /* console.log('jobs in backend->', jobs); */
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByPk(id);

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = req.body;
    const newJob = await Jobs.create(job);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Extract logged-in user ID from JWT
    const userRole = req.user.roleId; // Extract role from JWT

    const job = await Jobs.findByPk(id);

    if (job) {
      console.log('job.created_by->', job.created_by);
      console.log('userId->', userId);

      // 🚫 Check if the logged-in user is either the creator or an admin
      if (job.createdBy !== userId && userRole !== 1) {
        return res
          .status(403)
          .json({ error: 'You are not authorized to modify this job' });
      }

      await job.update(req.body);
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.roleId;

    const job = await Jobs.findByPk(id);

    if (job) {
      if (job.createdBy !== userId && userRole !== 1) {
        return res
          .status(403)
          .json({ error: 'You are not authorized to delete this job' });
      }

      const jobApplicationsCount = await JobApplication.count({
        where: { jobId: id },
      });

      if (jobApplicationsCount > 0) {
        return res.status(409).json({
          error:
            'You cannot delete the selected job because it already has job applications active',
        });
      }

      await job.destroy();
      res.status(200).json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
