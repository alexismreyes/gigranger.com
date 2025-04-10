import { useEffect, useState } from 'react';
import {
  fetchJobApplications as fetchJobApplicationsAPI,
  createJobApplication as createJobApplicationAPI,
  updateJobApplication as updateJobApplicationAPI,
  deleteJobApplication as deleteJobApplicationAPI,
  getJobApplicationsByUser as getJobApplicationsByUserAPI,
  getJobApplicationsByRecruiter as getJobApplicationsByRecruiterAPI,
} from '../services/jobApplicationService';

import useSnackBarContext from './useSnackBarContext';
import { JobApplication } from '../interfaces/interfaces';
import useAuthContext from './useAuthContext';
import { AxiosError } from 'axios';
import useLoadingContext from './useLoadingContext';

export const useJobApplicationManagement = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const { setSnackStatus } = useSnackBarContext();
  const { user } = useAuthContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    if (!user) return;

    switch (user.roleId) {
      case 1: //admin
        fetchJobApplications();
        //console.log('role admin');

        break;
      case 2: //job seeker
        getJobApplicationsByUser();
        //console.log('role job seeker');
        break;
      case 3: //recruiters
        getJobApplicationsByRecruiter();
        //console.log('role recruiter');
        break;
      default:
        throw new Error('No role defined');
    }
  }, [user]); // ✅ Run when `user` changes

  const fetchJobApplications = async () => {
    try {
      const data = await fetchJobApplicationsAPI();
      setJobApplications(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobApplicationsList',
        });
      }
    }
  };

  const createJobApplication = async (jobApplication: JobApplication) => {
    try {
      setLoading(true);
      const newJobApplication = await createJobApplicationAPI(jobApplication);
      setJobApplications((prev) => [...prev, newJobApplication]);
      setSnackStatus({
        open: true,
        action: 'created',
        source: 'JobsDetails',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateJobApplication = async (jobApplication: JobApplication) => {
    try {
      const updatedJobApplication = await updateJobApplicationAPI(
        jobApplication
      );
      setJobApplications((prev) =>
        prev.map((app) =>
          app.id === updatedJobApplication.id ? updatedJobApplication : app
        )
      );
      setSnackStatus({
        open: true,
        action: 'updated',
        source: 'JobApplicationsList',
        severity: 'success',
      });
      return true; //used to trigger the create jobApplicationHistory method
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const deleteJobApplication = async (jobApplicationId: number) => {
    try {
      await deleteJobApplicationAPI(jobApplicationId);
      setJobApplications((prev) =>
        prev.filter((app) => app.id !== jobApplicationId)
      );
      setSnackStatus({
        open: true,
        action: 'deleted',
        source: 'JobApplicationsList',
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
          source: 'JobApplicationsList',
        });
      }
    }
  };

  const getJobApplicationsByUser = async () => {
    try {
      const data = await getJobApplicationsByUserAPI();
      setJobApplications(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobApplicationsList',
        });
      }
    }
  };

  const getJobApplicationsByRecruiter = async () => {
    try {
      const data = await getJobApplicationsByRecruiterAPI();
      setJobApplications(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobApplicationsList',
        });
      }
    }
  };

  return {
    jobApplications,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
  };
};
