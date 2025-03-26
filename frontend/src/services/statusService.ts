import { Status } from '../interfaces/interfaces';
import api from './api';

const statusEndpoint = '/status';

export const fetchStatus = async (): Promise<Status[]> => {
  try {
    const response = await api.get<Status[]>(statusEndpoint);
    /* console.log(`statuses->`, response.data); */
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
