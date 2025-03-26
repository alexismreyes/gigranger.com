import { useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return <h2>Loggint out!!</h2>;
};

export default Logout;
