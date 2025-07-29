const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const { Jobs, User } = require('../models');

exports.matchJobs = async (req, res) => {
  try {
    const categoryId = req.query.categoryId || null;
    const user = await User.findByPk(req.user.id);

    if (!user || !user.resumeUrl) {
      return res.status(400).json({
        error:
          'Your resume has not been uploaded. Please upload it from the Edit User option.',
      });
    }

    const resumePath = user.resumeUrl;
    let buffer;

    if (resumePath.startsWith('http')) {
      const response = await axios.get(resumePath, {
        responseType: 'arraybuffer',
      });
      buffer = response.data;
    } else {
      const absolutePath = path.resolve(
        __dirname,
        '../uploads/resumes',
        path.basename(resumePath)
      );
      buffer = fs.readFileSync(absolutePath);
    }

    const resumeText = (await pdfParse(buffer)).text;
    const whereClause = categoryId ? { categoryId } : undefined;
    const allJobs = await Jobs.findAll({ where: whereClause });

    const jobsForModel = allJobs.map((job) => ({
      name: job.name,
      description: job.description,
    }));

    if (jobsForModel.length === 0) {
      return res
        .status(404)
        .json({ error: 'No jobs registered for this category' });
    }

    const matcherUrl = process.env.JOBMATCHINGSERVICEURL;
    const response = await axios.post(matcherUrl, {
      resumeText,
      jobs: jobsForModel,
    });
    const modelMatches = response.data;

    const normalize = (text) => text.trim().toLowerCase();
    const matchesWithFullData = modelMatches
      .map((match) => {
        const fullJob = allJobs.find(
          (job) =>
            normalize(job.name) === normalize(match.jobName) &&
            normalize(job.description) === normalize(match.description)
        );
        return fullJob ? { ...fullJob.toJSON(), score: match.score } : null;
      })
      .filter(Boolean);

    if (matchesWithFullData.length === 0) {
      return res.status(400).json({
        error:
          'The system did not find strong job matches based on your resume.',
      });
    }

    return res.status(200).json(matchesWithFullData);
  } catch (error) {
    console.error('❌ Error during job matching:', error);
    return res.status(500).json({ error: "Couldn't generate recommendations" });
  }
};
