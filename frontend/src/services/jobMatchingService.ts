import { Job } from '../interfaces/interfaces';
import api from './api';

const jobMatchingEndpoint = '/jobmatching';

export const fetchJobMatching = async (categoryId: string): Promise<Job[]> => {
  try {
    const response = await api.get<Job[]>(
      `${jobMatchingEndpoint}?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Something went wrong within the jobMatching service ->',
      error
    );
    throw error;
  }
};
