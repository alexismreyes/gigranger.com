import { Job } from '../interfaces/interfaces';
import api from './api';

const jobsEndpoint = '/jobs';

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await api.get<Job[]>(jobsEndpoint);
    /* console.log(`jobs->`, response.data); */
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createJob = async (newJob: Job): Promise<Job> => {
  try {
    const response = await api.post<Job>(jobsEndpoint, newJob);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateJob = async (job: Job): Promise<Job> => {
  try {
    const response = await api.put(`${jobsEndpoint}/${job.id}`, job);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteJob = async (jobId: number): Promise<void> => {
  try {
    await api.delete(`${jobsEndpoint}/${jobId}`);
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
