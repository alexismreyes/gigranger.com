import { useTranslation } from 'react-i18next';
import { LoggedUser, User } from '../interfaces/interfaces';
import {
  login as loginAPI,
  registerNewUser as registerNewUserAPI,
  requestUserVerification as requestUserVerificationAPI,
} from '../services/authService';
import useSnackBarContext from './useSnackBarContext';

export const useAuthManagement = () => {
  const { setSnackStatus } = useSnackBarContext();
  const { t } = useTranslation();

  const fetchLoggedUser = async (
    email: string,
    password: string
  ): Promise<LoggedUser | undefined> => {
    try {
      const data = await loginAPI(email, password);
      return data;
    } catch (error) {
      console.error('Error within the hook->', error);
      throw error;
    }
  };

  const registerNewUser = async (user: User) => {
    try {
      await registerNewUserAPI(user);
      setSnackStatus({ open: true, action: 'created', source: 'Login' });
    } catch (error) {
      console.error('Something went wrong within the service->', error);
      throw error;
    }
  };

  const requestUserVerification = async (user: User) => {
    try {
      await requestUserVerificationAPI(user);
      setSnackStatus({
        open: true,
        message: t('checkEmail'),
        severity: 'success',
        source: 'Login',
      });
    } catch (error: unknown) {
      console.error('Something went wrong within the service->', error);
      throw error;
    }
  };

  return {
    fetchLoggedUser,
    registerNewUser,
    requestUserVerification,
  };
};
