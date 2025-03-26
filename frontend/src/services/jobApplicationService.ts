import { JobApplication } from '../interfaces/interfaces';
import api from './api';

const jobApplicationEndpoint = '/jobapplication';
const seekersEndpoint = '/jobapplication/seeker';
const recruitersEndpoint = '/jobapplication/recruiter';

export const fetchJobApplications = async (): Promise<JobApplication[]> => {
  try {
    const response = await api.get<JobApplication[]>(jobApplicationEndpoint);
    /* console.log('job applications->', response.data); */
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createJobApplication = async (
  newJobApplication: JobApplication
): Promise<JobApplication> => {
  try {
    console.log(newJobApplication);

    const response = await api.post<JobApplication>(
      jobApplicationEndpoint,
      newJobApplication
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateJobApplication = async (
  jobApplication: JobApplication
): Promise<JobApplication> => {
  try {
    const response = await api.put(
      `${jobApplicationEndpoint}/${jobApplication.id}`,
      jobApplication
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteJobApplication = async (
  jobApplicationId: number
): Promise<void> => {
  try {
    await api.delete(`${jobApplicationEndpoint}/${jobApplicationId}`);
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const getJobApplicationsByUser = async (): Promise<JobApplication[]> => {
  try {
    const response = await api.get<JobApplication[]>(seekersEndpoint);

    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const getJobApplicationsByRecruiter = async (): Promise<
  JobApplication[]
> => {
  try {
    const response = await api.get<JobApplication[]>(recruitersEndpoint);

    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
