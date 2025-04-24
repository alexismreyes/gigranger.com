require('dotenv').config();
const express = require('express');
const { recommendedJobs } = require('./jobMatcher');

const app = express();
app.use(express.json());

app.post('/jobmatching', async (req, res) => {
  try {
    const { resumeText, jobs } = req.body;

    if (!resumeText || !jobs || !Array.isArray(jobs)) {
      return res
        .status(400)
        .json({ error: 'Invalid input for search a job matching ' });
    }

    const result = await recommendedJobs(resumeText, jobs);
    res.json(result);
  } catch (error) {
    console.error('❌ Error recommending jobs:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🧠 Job Matching Service listening on port ${PORT}`)
);
