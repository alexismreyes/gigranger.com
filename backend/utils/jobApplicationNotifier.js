const { JobApplication, Jobs, User, Status } = require('../models');
const { sendMailToApplicants, sendMailToRecruiter } = require('./emailService');

const notifyUserOfJobApplicationStatus = async (
  jobAppId,
  updatedStatusId,
  comment = ''
) => {
  // Step 2. Fetch job application
  const jobApp = await JobApplication.findByPk(jobAppId);
  if (!jobApp) throw new Error('Job Application not found');

  // Step 3. Fetch user
  const user = await User.findByPk(jobApp.userId);
  if (!user) throw new Error('User not found');

  // Step 4. Fetch job
  const job = await Jobs.findByPk(jobApp.jobId);
  if (!job) throw new Error('Job not found');

  // Step 5. Fetch status name
  const status = await Status.findByPk(updatedStatusId);

  // Step 6. Send the email
  await sendMailToApplicants({
    to: user.email,
    name: `${user.firstName} ${user.lastName}`,
    jobName: job.name,
    newStatus: status ? status.name : 'Updated',
    comment,
  });
};

const notifyRecruiterOfJobApplication = async (userId, jobId, requestDate) => {
  // Fetch job
  const job = await Jobs.findByPk(jobId);
  if (!job) throw new Error('Job not found');

  // Fetch recruiter info
  const recruiter = await User.findByPk(job.createdBy);
  if (!recruiter) throw new Error('recruiter not found');

  // Fetch job seeker info
  const applicant = await User.findByPk(userId);
  if (!applicant) throw new Error('applicant not found');

  // Send the email
  await sendMailToRecruiter({
    to: recruiter.email,
    recruiterName: `${recruiter.firstName} ${recruiter.lastName}`,
    jobName: job.name,
    applicantName: `${applicant.firstName} ${applicant.lastName}`,
    requestDate,
  });
};

module.exports = {
  notifyUserOfJobApplicationStatus,
  notifyRecruiterOfJobApplication,
};
