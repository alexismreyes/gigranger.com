import { useEffect, useState } from 'react';
import {
  fetchJobApplicationsHistory as fetchJobApplicationsHistoryAPI,
  createJobApplicationHistory as createJobApplicationHistoryAPI,
  updateJobApplicationHistory as updateJobApplicationHistoryAPI,
  deleteJobApplicationHistory as deleteJobApplicationHistoryAPI,
} from '../services/jobApplicationHistoryService';

import useSnackBarContext from './useSnackBarContext';
import { JobApplicationHistory } from '../interfaces/interfaces';
import useAuthContext from './useAuthContext';
import { AxiosError } from 'axios';

export const useJobApplicationHistoryManagement = () => {
  const [jobApplicationsHistory, setJobApplicationsHistory] = useState<
    JobApplicationHistory[]
  >([]);
  const { setSnackStatus } = useSnackBarContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchJobApplicationsHistory();
  }, [user]); // ✅ Run when `user` changes

  const fetchJobApplicationsHistory = async () => {
    try {
      const data = await fetchJobApplicationsHistoryAPI();
      setJobApplicationsHistory(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobApplicationsHistoryList', //page do not exist yet
        });
      }
    }
  };

  const createJobApplicationHistory = async (
    jobApplicationHistory: JobApplicationHistory
  ) => {
    try {
      const newJobApplicationHistory = await createJobApplicationHistoryAPI(
        jobApplicationHistory
      );
      setJobApplicationsHistory((prev) => [...prev, newJobApplicationHistory]);
      /* setSnackStatus({
        open: true,
        action: 'created',        
      }); */
    } catch (error) {
      console.error('Error within the hook->', error);
      throw error;
    }
  };

  const updateJobApplicationHistory = async (
    jobApplicationHistory: JobApplicationHistory
  ) => {
    try {
      const updatedJobApplicationHistory = await updateJobApplicationHistoryAPI(
        jobApplicationHistory
      );
      setJobApplicationsHistory((prev) =>
        prev.map((his) =>
          his.id === updatedJobApplicationHistory.id
            ? updatedJobApplicationHistory
            : his
        )
      );
      setSnackStatus({ open: true, action: 'updated' });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const deleteJobApplicationHistory = async (
    jobApplicationHistoryId: number
  ) => {
    try {
      await deleteJobApplicationHistoryAPI(jobApplicationHistoryId);
      setJobApplicationsHistory((prev) =>
        prev.filter((his) => his.id !== jobApplicationHistoryId)
      );
      setSnackStatus({ open: true, action: 'deleted' });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  return {
    jobApplicationsHistory,
    fetchJobApplicationsHistory,
    createJobApplicationHistory,
    updateJobApplicationHistory,
    deleteJobApplicationHistory,
  };
};
