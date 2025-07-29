import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { User } from '../../interfaces/interfaces';
import { useState } from 'react';
import UserRegistrationForm from './UserRegistrationForm';
import { useRolesManagement } from '../../hooks/useRolesManagement';
import { useTranslation } from 'react-i18next';

interface UserRegistrationProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserRegistrationDialog: React.FC<UserRegistrationProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [initialValues] = useState<User>({
    firstName: '',
    lastName: '',
    roleId: '',
    email: '',
    password: '',
    resumeUrl: '',
  });

  const { roles } = useRolesManagement(true); //we send true to set this is for public retrieval and do not show admin role
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '600px',
          maxWidth: '95%',
        },
        textAlign: 'center',
        p: 2, // add padding for internal spacing
      }}
    >
      <DialogTitle>{t('new-user-title')}</DialogTitle>
      <DialogContent>
        <UserRegistrationForm
          onSave={onSave}
          initialValues={initialValues}
          onClose={onClose}
          roles={roles}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationDialog;
