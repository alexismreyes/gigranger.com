const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMailToApplicants = async ({
  to,
  name,
  jobName,
  newStatus,
  comment,
}) => {
  const mailOptions = {
    from: `"GIGRANGER.COM" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Application Update: ${jobName}`,
    html: `
          <p>Hi ${name},</p>
          <p>Your application for <strong>${jobName}</strong> has been updated to: <strong>${newStatus}</strong>.</p>
          ${comment ? `<p><strong>Comment:</strong> ${comment}</p>` : ''}
          <p>Thanks for using our job portal!</p>
        `,
  };

  try {
    console.log(`Sending email to ${to} about ${jobName}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};

const sendMailToRecruiter = async ({
  to,
  recruiterName,
  jobName,
  applicantName,
  requestDate,
}) => {
  const mailOptions = {
    from: `"GIGRANGER.COM" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Application created for: ${jobName}`,
    html: `
            <p>Hi ${recruiterName},</p>
            <p>An application has been submited for the open position: <strong>${jobName}</strong> 
            by the applicant: <strong>${applicantName}</strong>, on date: <strong>${requestDate}</strong>.</p>            
            <p>Thanks for using our job portal!</p>
          `,
  };

  try {
    console.log(`Sending email to ${to} about ${jobName}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};

const sendVerificationEmail = async (to, link) => {
  const mailOptions = {
    from: `"GIGRANGER.COM" <${process.env.EMAIL_SENDER}>`,
    to,
    subject: 'Verify your email address',
    html: `
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${link}">${link}</a>
        <p>This link will expire in 30 minutes.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendMailToApplicants,
  sendMailToRecruiter,
  sendVerificationEmail,
};
