const axios = require('axios');

const recommendedJobs = async (resumeText, jobs) => {
  const headers = {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const modelUrl = process.env.MODEL_URL;

  const results = [];

  // Split jobs into chunks of 10 (limit per Hugging Face request)
  const chunkSize = 10;
  for (let i = 0; i < jobs.length; i += chunkSize) {
    const jobChunk = jobs.slice(i, i + chunkSize);

    const candidateLabels = jobChunk.map(
      (job) => `${job.name}: ${job.description}`
    );

    const payload = {
      inputs: resumeText,
      parameters: {
        candidate_labels: candidateLabels,
        multi_label: true,
      },
    };

    try {
      const response = await axios.post(modelUrl, payload, { headers });

      const scores = response.data.scores;
      const labels = response.data.labels;

      for (let j = 0; j < labels.length; j++) {
        const [jobName, jobDesc] = labels[j].split(': ');
        const score = scores[j];

        if (score >= 0.09) {
          results.push({
            jobName: jobName.trim(),
            description: jobDesc?.trim() || '',
            score: parseFloat(score.toFixed(4)),
          });
        }
      }
    } catch (error) {
      console.error(
        `❌ Error in job group ${i / chunkSize + 1}:`,
        error.response?.data || error.message
      );
    }
  }

  // Sort from highest to lowest score
  results.sort((a, b) => b.score - a.score);
  return results;
};

module.exports = { recommendedJobs };
