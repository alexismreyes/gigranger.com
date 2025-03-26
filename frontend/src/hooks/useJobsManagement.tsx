import { useEffect, useState } from 'react';
import {
  fetchJobs as fetchJobsAPI,
  createJob as createJobAPI,
  updateJob as updateJobAPI,
  deleteJob as deleteJobAPI,
} from '../services/JobsService';
import { Job } from '../interfaces/interfaces';
import useSnackBarContext from './useSnackBarContext';
import { AxiosError } from 'axios';

export const useJobsManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { setSnackStatus } = useSnackBarContext();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await fetchJobsAPI();
      setJobs(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const createJob = async (job: Job) => {
    try {
      const newJob = await createJobAPI(job);
      setJobs((prev) => [...prev, newJob]);
      setSnackStatus({
        open: true,
        action: 'created',
        source: 'JobsList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const updateJob = async (job: Job) => {
    try {
      const updatedJob = await updateJobAPI(job);
      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      setSnackStatus({
        open: true,
        action: 'updated',
        source: 'JobsList',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobsList',
        });
      }
    }
  };

  const deleteJob = async (jobId: number) => {
    try {
      await deleteJobAPI(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setSnackStatus({
        open: true,
        action: 'deleted',
        source: 'JobsList',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobsList',
        });
      }
    }
  };

  return {
    jobs,
    createJob,
    updateJob,
    deleteJob,
  };
};
