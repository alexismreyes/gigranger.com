import { User } from '../interfaces/interfaces';
import api from './api';

const usersEndpoint = '/users';
const uploadsEndpoint = '/uploads/resumes';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>(usersEndpoint);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createUser = async (newUser: User): Promise<User> => {
  try {
    const response = await api.post<User>(usersEndpoint, newUser);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await api.put(`${usersEndpoint}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`${usersEndpoint}/${userId}`);
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const uploadResume = async (resumeFile: File) => {
  try {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    const response = await api.post(uploadsEndpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    /* console.log(`response.data en uploadResume service->`, response.data);
    console.log('Uploading to:', response.data.resumeUrl); */

    return response.data.resumeUrl; //return only the url string
  } catch (error) {
    console.error('Something went wrong within the upload service->', error);
    throw error;
  }
};

export const fetchLoggedUserById = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`${usersEndpoint}/${userId}`);
  console.log(`user received in the service->`, response.data);
  return response.data;
};
