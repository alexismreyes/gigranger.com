import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute: React.FC = () => {
  const { token, user, loading } = useAuthContext();

  if (loading) return <h1>Loading...</h1>;

  // ✅ Function to check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
    } catch (error) {
      console.log(error);

      return true; // If decoding fails, consider token invalid
    }
  };

  if (!token || !user || isTokenExpired(token))
    return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
