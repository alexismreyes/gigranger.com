const { Jobs, User, Status, JobApplication } = require('../models');

const userInfoForJobApplication = async (userId, jobId) => {
  try {
    // Fetch job
    const job = await Jobs.findByPk(jobId);
    if (!job) throw new Error('Job not found');

    // Fetch recruiter info
    const recruiter = await User.findByPk(job.createdBy);
    if (!recruiter) throw new Error('recruiter not found');

    // Fetch job seeker info
    const applicant = await User.findByPk(userId);
    if (!applicant) throw new Error('applicant not found');

    return {
      recruiter,
      job,
      applicant,
    };
  } catch (err) {
    console.error(
      'something went wrong retrieve user recruiter/applicant info'
    );
  }
};

const userInfoForJobApplicationHistory = async (jobAppId, updatedStatusId) => {
  try {
    // Fetch job application
    const jobApp = await JobApplication.findByPk(jobAppId);
    if (!jobApp) throw new Error('Job Application not found');

    //Fetch user
    const user = await User.findByPk(jobApp.userId);
    if (!user) throw new Error('User not found');

    //Fetch job
    const job = await Jobs.findByPk(jobApp.jobId);
    if (!job) throw new Error('Job not found');

    //Fetch status name
    const status = await Status.findByPk(updatedStatusId);

    return {
      user,
      job,
      status,
    };
  } catch (err) {
    console.error(
      'something went wrong retrieve user recruiter/applicant info'
    );
  }
};

module.exports = {
  userInfoForJobApplication,
  userInfoForJobApplicationHistory,
};
