import { Role } from '../interfaces/interfaces';
import api from './api';

const rolesEndpoint = '/roles';

/* export const fetchRoles = async (): Promise<Role[]> => {
  try {
    const response = await api.get<Role[]>(rolesEndpoint);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
}; */

//if public=true it means the roles retrieval is performed from new user registration solo its public
//and admin role must not be shown, otherwise admin will be shown
export const fetchRoles = async (
  publicOnly: boolean = false
): Promise<Role[]> => {
  try {
    const url = publicOnly ? `${rolesEndpoint}?public=true` : rolesEndpoint;
    const response = await api.get<Role[]>(url);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the role service ->', error);
    throw error;
  }
};
