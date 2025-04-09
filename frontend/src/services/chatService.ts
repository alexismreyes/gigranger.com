import { Chat } from '../interfaces/interfaces';
import api from './api';

const chatEndpoint = '/chat';

export const startChat = async (newChat: Chat) => {
  try {
    //console.log(`newChat->`, newChat);
    const response = await api.post(`${chatEndpoint}/start`, newChat);
    //console.log(`returned from start->`, response.data);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

/* export const createCompany = async (newCompany: Company): Promise<Company> => {
  try {
    const response = await api.post<Company>(companiesEndpoint, newCompany);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const updateCompany = async (company: Company): Promise<Company> => {
  try {
    const response = await api.put(
      `${companiesEndpoint}/${company.id}`,
      company
    );
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const deleteCompany = async (companyId: number): Promise<void> => {
  try {
    await api.delete(`${companiesEndpoint}/${companyId}`);
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
 */
