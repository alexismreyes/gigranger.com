import { JobApplicationHistory } from '../interfaces/interfaces';
import api from './api';

const jobApplicationHistoryEndpoint = '/jobapplicationhistory';

export const fetchJobApplicationsHistory = async (): Promise<
  JobApplicationHistory[]
> => {
  try {
    const response = await api.get<JobApplicationHistory[]>(
      jobApplicationHistoryEndpoint
    );
    /* console.log('job applications->', response.data); */
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createJobApplicationHistory = async (
  newJobApplicationHistory: JobApplicationHistory
): Promise<JobApplicationHistory> => {
  try {
    const response = await api.post<JobApplicationHistory>(
      jobApplicationHistoryEndpoint,
      newJobApplicationHistory
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateJobApplicationHistory = async (
  JobApplicationHistory: JobApplicationHistory
): Promise<JobApplicationHistory> => {
  try {
    const response = await api.put(
      `${jobApplicationHistoryEndpoint}/${JobApplicationHistory.id}`,
      JobApplicationHistory
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteJobApplicationHistory = async (
  jobApplicationHistoryId: number
): Promise<void> => {
  try {
    await api.delete(
      `${jobApplicationHistoryEndpoint}/${jobApplicationHistoryId}`
    );
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
