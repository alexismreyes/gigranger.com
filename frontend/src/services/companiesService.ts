import { Company } from '../interfaces/interfaces';
import api from './api';

const companiesEndpoint = '/companies';

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get<Company[]>(companiesEndpoint);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const createCompany = async (newCompany: Company): Promise<Company> => {
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
