import { useEffect, useState } from 'react';
import { fetchRoles as fetchRolesAPI } from '../services/roleService';
import { Role } from '../interfaces/interfaces';

export const useRolesManagement = (publicOnly: boolean = false) => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await fetchRolesAPI(publicOnly); // pass the flag to the service
      setRoles(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  return {
    roles,
  };
};
