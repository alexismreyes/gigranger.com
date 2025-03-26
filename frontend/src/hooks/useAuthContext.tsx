import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return authContext;
};

export default useAuthContext;
