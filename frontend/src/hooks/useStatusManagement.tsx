import { useEffect, useState } from 'react';
import { fetchStatus as fetchStatusAPI } from '../services/statusService';
import { Status } from '../interfaces/interfaces';

export const useStatusManagement = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const data = await fetchStatusAPI();
      setStatuses(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  return {
    statuses,
  };
};
