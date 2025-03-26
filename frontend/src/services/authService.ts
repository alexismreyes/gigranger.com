import { LoggedUser, User } from '../interfaces/interfaces';
import api from './api';

const authEndpoint = '/auth';

export const login = async (
  email: string,
  password: string
): Promise<LoggedUser> => {
  try {
    const response = await api.post<LoggedUser>(`${authEndpoint}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const registerNewUser = async (newUser: User): Promise<User> => {
  try {
    const response = await api.post<User>(`${authEndpoint}/register`, newUser);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const requestUserVerification = async (user: User): Promise<void> => {
  await api.post('/auth/request-verification', user);
};
