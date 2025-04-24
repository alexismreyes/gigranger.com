import { useState } from 'react';
import { fetchJobMatching as fetchJobMatchingAPI } from '../services/jobMatchingService';
import { Job } from '../interfaces/interfaces';
import useLoadingContext from './useLoadingContext';
import useSnackBarContext from './useSnackBarContext';
import { AxiosError } from 'axios';

export const useJobMatchingManagement = () => {
  const [jobMatches, setJobMatches] = useState<Job[]>([]);
  const { setLoading } = useLoadingContext();
  const { setSnackStatus } = useSnackBarContext();

  const fetchJobMatching = async (categoryId: string) => {
    try {
      setLoading(true);
      const data = await fetchJobMatchingAPI(categoryId);
      console.log('job matches in hook->', data);

      setJobMatches(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;

        console.error('Error within the hook->', message);
        setSnackStatus({
          open: true,
          action: 'no-resume',
          message: message,
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
