import { JobCategory } from '../interfaces/interfaces';
import api from './api';

//const JOBCATEGORIES_API = `${import.meta.env.VITE_API_URL}/jobcategories`;
const jobcategoriesEndpoint = '/jobcategories';

export const fetchJobCategories = async (): Promise<JobCategory[]> => {
  try {
    const response = await api.get<JobCategory[]>(jobcategoriesEndpoint);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createJobCategory = async (
  newJobCategory: JobCategory
): Promise<JobCategory> => {
  try {
    const response = await api.post<JobCategory>(
      jobcategoriesEndpoint,
      newJobCategory
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateJobCategory = async (
  jobCategory: JobCategory
): Promise<JobCategory> => {
  try {
    const response = await api.put(
      `${jobcategoriesEndpoint}/${jobCategory.id}`,
      jobCategory
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteJobCategory = async (
  jobCategoryId: number
): Promise<void> => {
  try {
    await api.delete(`${jobcategoriesEndpoint}/${jobCategoryId}`);
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
