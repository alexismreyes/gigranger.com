import { useState } from 'react';
import UsersTable from '../components/users/UsersTable';
import { useRolesManagement } from '../hooks/useRolesManagement';
import { useUsersManagement } from '../hooks/useUsersManagement';
import { User } from '../interfaces/interfaces';
import UsersDialog from '../components/users/UsersDialog';
import { Button, Container, Typography } from '@mui/material';
import HasRole from '../components/HasRole';
import useAuthContext from '../hooks/useAuthContext';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SnackBar from '../components/SnackBar';
import useSnackBarContext from '../hooks/useSnackBarContext';
import { useTranslation } from 'react-i18next';

const UsersList: React.FC = () => {
  const { user, token, login } = useAuthContext();
  const {
    users,
    createUser,
    updateUser,
    deleteUser,
    uploadResume,
    /* resumeUrl, */
    fetchLoggedUserById,
  } = useUsersManagement();
  const { roles } = useRolesManagement();

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number>(0);
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { t } = useTranslation();

  const handleOpenDialog = (user?: User | undefined) => {
    setCurrentUser(user);
    setDialogOpen(true);
  };

  const handleSaveUser = async (newUser: User) => {
    if (currentUser) {
      await updateUser(newUser);

      if (user?.roleId === 2) {
        //this re-fetch and update context is done to validate in the job applications component to show/hide the alert to upload resume
        // Re-fetch the updated user
        const updatedUser = await fetchLoggedUserById(newUser?.id as number);
        // Update context
        if (token && updatedUser) {
          login(token, updatedUser);
        }
      }
    } else {
      await createUser(newUser);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentUser(undefined);
  };

  const handleRequestDelete = (userId: number) => {
    setConfirmationDialogOpen(true);
    setUserToDelete(userId);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteUser(userToDelete);
    setConfirmationDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5">
        <HasRole role={1}>{t('users-title')}</HasRole>
        <HasRole role={[2, 3]}>{t('user-title')}</HasRole>
      </Typography>

      <HasRole role={1}>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          {t('users-add')}
        </Button>
      </HasRole>

      <UsersTable
        users={users}
        roles={roles}
        onEdit={handleOpenDialog}
        onDelete={handleRequestDelete}
        user={user}
      />
      <UsersDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        currentUser={currentUser}
        roles={roles}
        uploadResume={uploadResume}
        /* resumeUrl={resumeUrl} */
      />

      <ConfirmationDialog
        open={confirmationDialogOpen}
        title={t('confirm-deletion')}
        message={t('users-dialog-content')}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />

      <SnackBar
        parentComponent="UsersList"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </Container>
  );
};
export default UsersList;
