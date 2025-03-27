import { useEffect, useState } from 'react';
import {
  fetchUsers as fetchUsersAPI,
  createUser as createUserAPI,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
  uploadResume as uploadResumeAPI,
  fetchLoggedUserById as fetchLoggedUserByIdAPI,
} from '../services/usersService';
import { User } from '../interfaces/interfaces';
import useSnackBarContext from './useSnackBarContext';
import { AxiosError } from 'axios';

export const useUsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { setSnackStatus } = useSnackBarContext();
  /* const { user, token, login } = useAuthContext(); */

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersAPI();
      setUsers(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const createUser = async (user: User) => {
    try {
      const newUser = await createUserAPI(user);
      setUsers((prev) => [...prev, newUser]);
      setSnackStatus({
        open: true,
        action: 'created',
        source: 'UsersList',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'UsersList',
        });
      }
    }
  };

  const updateUser = async (user: User) => {
    try {
      const updatedUser = await updateUserAPI(user);
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setSnackStatus({
        open: true,
        action: 'updated',
        source: 'UsersList',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'UsersList',
        });
      }
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserAPI(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setSnackStatus({
        open: true,
        action: 'deleted',
        source: 'UsersList',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'UsersList',
        });
      }
    }
  };

  const uploadResume = async (resumeFile: File) => {
    try {
      const uploadedResumeUrl = await uploadResumeAPI(resumeFile);

      return uploadedResumeUrl;
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const fetchLoggedUserById = async (userId: number) => {
    try {
      const response = await fetchLoggedUserByIdAPI(userId);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    users,
    uploadResume,
    createUser,
    updateUser,
    deleteUser,
    fetchLoggedUserById,
  };
};
