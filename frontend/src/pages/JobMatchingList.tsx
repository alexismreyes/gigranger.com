import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import JobMatchingTable from '../components/jobMatching/JobMatchingTable';
import { useJobMatchingManagement } from '../hooks/useJobMatchingManagement';
import SnackBar from '../components/SnackBar';
import useSnackBarContext from '../hooks/useSnackBarContext';
import { useJobCategoriesManagement } from '../hooks/useJobCategoriesMangement';

import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const JobMatchingList = () => {
  const { isMatchingLoading, jobMatches, fetchJobMatching } =
    useJobMatchingManagement();

  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { jobCategories } = useJobCategoriesManagement();
  const [categoryId, setCategoryId] = useState<string>('');
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        🎯 {t('job-matching-title')}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        <Trans i18nKey="job-matching-description" />
        <br />
        <br />
        <strong>
          <Trans i18nKey="job-matching-notes-title" />
        </strong>
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>
            <Trans
              i18nKey="job-matching-note-1"
              components={{ strong: <strong /> }}
            />
          </li>
          <li>
            <Trans
              i18nKey="job-matching-note-2"
              components={{ strong: <strong /> }}
            />
            <ul>
              <li>
                <Trans
                  i18nKey="job-matching-note-2-sub-1"
                  components={{ red: <span style={{ color: 'red' }} /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="job-matching-note-2-sub-2"
                  components={{ orange: <span style={{ color: 'orange' }} /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="job-matching-note-2-sub-3"
                  components={{ blue: <span style={{ color: '#45b4c6' }} /> }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="job-matching-note-2-sub-4"
                  components={{ green: <span style={{ color: 'green' }} /> }}
                />
              </li>
            </ul>
          </li>
          <li>
            <Trans i18nKey="job-matching-note-3" />
          </li>
          <li>
            <Trans
              i18nKey="job-matching-note-4"
              components={{ strong: <strong /> }}
            />
          </li>
          <li>
            <Trans i18nKey="job-matching-note-5" />
          </li>
          <li>
            <Trans i18nKey="job-matching-note-6" />
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" sx={{ mt: 4, mb: 2 }}>
        <strong>
          <Trans i18nKey="job-matching-call-to-action" />
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
                : t('jobs-dialog-category')
            }
            sx={{ minWidth: 300 }}
          >
            <MenuItem value="">{t('jobs-dialog-category')}</MenuItem>
            {jobCategories
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cat) => (
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
            <Trans
              i18nKey="job-matching-select-category-note"
              components={{ strong: <strong /> }}
            />
          </Typography>
        </Box>

        {/* Button below */}
        <Button
          variant="contained"
          onClick={() => fetchJobMatching(categoryId)}
          disabled={isMatchingLoading}
          sx={{
            mb: 3,
            animation: isMatchingLoading ? 'heartbeat 1.5s infinite' : 'none',
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
          {isMatchingLoading ? (
            <>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} color="inherit" />
                <Typography variant="caption">
                  {t('job-matching-researching')}
                </Typography>
              </Box>
            </>
          ) : (
            t('job-matching-find-button')
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
