import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import JobMatchingTable from '../components/jobMatching/JobMatchingTable';
import { useJobMatchingManagement } from '../hooks/useJobMatchingManagement';
import useLoadingContext from '../hooks/useLoadingContext';
import GlobalLoader from '../components/GlobalLoader';
import SnackBar from '../components/SnackBar';
import useSnackBarContext from '../hooks/useSnackBarContext';
import { useJobCategoriesManagement } from '../hooks/useJobCategoriesMangement';

import { useState } from 'react';

const JobMatchingList = () => {
  const { jobMatches, fetchJobMatching } = useJobMatchingManagement();
  const { isLoading } = useLoadingContext();
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { jobCategories } = useJobCategoriesManagement();
  const [categoryId, setCategoryId] = useState<string>('');

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        🎯 AI-Based Job Matching
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        This feature compares your resume against all registered jobs ir our
        database or those from a selected category using an AI model hosted on
        Hugging Face. The process may take from a few to several seconds
        depending on factors like internet speed, the number of available jobs,
        and the time it takes the AI model to analyze and compare each job
        against your resume.
        <br />
        <br />
        <strong>Important notes:</strong>
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>
            We are currently using a{' '}
            <strong>free-tier, general-purpose AI model</strong>. While this
            enables testing the functionality at no cost, the results may not be
            fully accurate. It also depends on how your resume is structured to
            improve accurate results.
          </li>
          <li>
            Each matched job is assigned a <strong>score</strong> representing
            how well your resume aligns with that job's description:
            <ul>
              <li>
                <span style={{ color: 'red' }}>Red (≤ 10%)</span> – Very weak
                match
              </li>
              <li>
                <span style={{ color: 'orange' }}>Orange (10% – 30%)</span> –
                Weak relevance
              </li>
              <li>
                <span style={{ color: '#45b4c6' }}>Light Blue (30% – 60%)</span>{' '}
                – Moderate compatibility
              </li>
              <li>
                <span style={{ color: 'green' }}>Green (over 60%)</span> –
                Strong match
              </li>
            </ul>
          </li>
          <li>
            After results are displayed, you can check for job details clicking
            the eye-shaped button next to the score and apply to the job
          </li>
          <li>
            You may optionally use the <strong>Category</strong> filter above
            the button to narrow the comparison to a specific job field. If no
            category is selected, the matching process runs against all jobs
            which of course will take more time.
          </li>
          <li>
            Future versions may include more advanced, paid AI models to improve
            accuracy. For now, this microservice illustrates the core
            functionality of automated resume-to-job matching.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" sx={{ mt: 4, mb: 2 }}>
        <strong>
          Select a Job Category and Click the button bellow to start the
          matching process
        </strong>
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
        {/* Row: Select + Text */}
        <Box display="flex" alignItems="center" gap={2}>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            displayEmpty
            renderValue={(selected) =>
              selected
                ? jobCategories.find((cat) => cat.id === Number(selected))?.name
                : 'Select Category'
            }
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {jobCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>

          <Typography
            variant="body2"
            sx={{
              color: 'error.main',
              whiteSpace: 'nowrap',
            }}
          >
            <strong>
              Keep as "Select Category" to search in all job categories (takes
              more time)
            </strong>
          </Typography>
        </Box>

        {/* Button below */}
        <Button
          variant="contained"
          onClick={() => fetchJobMatching(categoryId)}
          disabled={isLoading}
          sx={{
            mb: 3,
            animation: isLoading ? 'heartbeat 1.5s infinite' : 'none',
            '@keyframes heartbeat': {
              '0%, 100%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.05)',
              },
            },
          }}
        >
          {isLoading ? (
            <GlobalLoader context="job-matching" inline />
          ) : (
            'Find Matching Jobs'
          )}
        </Button>
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {jobMatches.length > 0 && <JobMatchingTable jobMatches={jobMatches} />}

      <SnackBar
        parentComponent="JobMatchingList"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </Box>
  );
};

export default JobMatchingList;
