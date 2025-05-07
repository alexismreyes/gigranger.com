import { useState } from 'react';
import { fetchJobMatching as fetchJobMatchingAPI } from '../services/jobMatchingService';
import { Job } from '../interfaces/interfaces';
import useLoadingContext from './useLoadingContext';
import useSnackBarContext from './useSnackBarContext';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export const useJobMatchingManagement = () => {
  const [jobMatches, setJobMatches] = useState<Job[]>([]);
  const { setLoading } = useLoadingContext();
  const { setSnackStatus } = useSnackBarContext();
  const { t } = useTranslation();

  const fetchJobMatching = async (categoryId: string) => {
    try {
      setLoading(true);
      const data = await fetchJobMatchingAPI(categoryId);
      console.log('job matches in hook->', data);

      setJobMatches(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;

        const backendMessage = error.response?.data.error;
        const errorKeyMap: Record<string, string> = {
          'Your resume has not been uploaded. Please upload it from the Edit User option.':
            'no-resume',
          'No jobs registered for this category': 'no-jobs',
          'The system did not find strong job matches based on your resume.':
            'no-matches',
          "Couldn't generate recommendations": 'server-failure',
        };

        const key = errorKeyMap[backendMessage] || 'server-failure';
        const translated = t(`job-matching-errors.${key}`);

        console.error('Error within the hook->', message);
        setSnackStatus({
          open: true,
          action: 'no-resume',
          //message: message,
          message: translated,
          severity: 'error',
          source: 'JobMatchingList',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    jobMatches,
    fetchJobMatching,
  };
};
