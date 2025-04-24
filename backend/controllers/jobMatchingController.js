const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Jobs, User } = require('../models');
const axios = require('axios');

exports.matchJobs = async (req, res) => {
  try {
    const categoryId = req.query.categoryId || null; // optional filter

    // fetch full user from DB
    const user = await User.findByPk(req.user.id);

    console.log('Decoded user from token:', req.user);

    if (!user || !user.resumeUrl) {
      return res.status(400).json({
        error:
          'Your resume has not been uploaded, please refer to the Users section and upload it from the Edit option',
      });
    }

    const resumePath = user.resumeUrl;

    const absolutePath = path.resolve(
      __dirname,
      '../uploads/resumes',
      path.basename(resumePath)
    ); //This ensures the path resolves from the actual backend folder, not the root of the container filesystem.

    const buffer = fs.readFileSync(absolutePath);

    // ✅ Step 2: Parse resume text
    const resumeText = (await pdfParse(buffer)).text;

    // ✅ Step 3: Fetch all jobs from DB
    const whereClause = categoryId ? { categoryId } : undefined;
    const allJobs = await Jobs.findAll({ where: whereClause });

    /* console.log(
      '📄 All job names in DB:',
      allJobs.map((job) => job.name)
    ); */

    const jobsForModel = allJobs.map((job) => ({
      name: job.name,
      description: job.description,
    }));

    if (jobsForModel.length === 0) {
      return res
        .status(404)
        .json({ error: 'No jobs registered for this category' });
    }

    // ✅ Step 4: Call external model API
    const matcherUrl = process.env.JOBMATCHINGSERVICEURL;

    const response = await axios.post(matcherUrl, {
      resumeText,
      jobs: jobsForModel,
    });

    const modelMatches = response.data;

    /* RETURNED MODEL RESPONSE
    {
      jobName: "Full Stack Developer",
      description: "Develop modern web apps with backend integration",
      score: 0.1129
    } */

    /* console.log(
      '🧪 Model matches returned from job-matching-service:',
      modelMatches
    ); */

    // ✅ Step 5: Merge score with full job data

    const normalize = (text) => text.trim().toLowerCase();

    const matchesWithFullData = modelMatches
      .map((match) => {
        const fullJob = allJobs.find(
          (job) =>
            normalize(job.name) === normalize(match.jobName) &&
            normalize(job.description) === normalize(match.description)
        );

        if (!fullJob) {
          console.warn(
            `⚠️ No matching full job found for: ${match.jobName} - ${match.description}`
          );
          return null;
        }

        return {
          ...fullJob.toJSON(),
          score: match.score,
        };
      })
      .filter(Boolean);

    //console.log('Matching jobs in the backend->', matchesWithFullData);

    // ✅ Return informative message if no matches found
    if (matchesWithFullData.length === 0) {
      return res.status(400).json({
        error:
          'The system did not find strong job matches based on your resume content and the available jobs',
        //matches: [],
      });
    }

    return res.status(200).json(matchesWithFullData);
  } catch (error) {
    console.error('There was an error within the recommendation ->', error);
    return res.status(500).json({ error: "Couldn't generate recommendations" });
  }
};
