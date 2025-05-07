import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Role, User } from '../../interfaces/interfaces';
import HasRole from '../HasRole';
import { useTranslation } from 'react-i18next';

interface JobsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  currentUser?: User | undefined;
  roles: Role[];
  uploadResume: (resumeFile: File) => Promise<string>;
  /* resumeUrl: string; */
}

const UsersDialog: React.FC<JobsDialogProps> = ({
  open,
  onClose,
  onSave,
  currentUser,
  roles,
  uploadResume,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Add password state
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [role, setRole] = useState<number | string>(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
      setPassword('');
      setConfirmPassword('');
      setRole(currentUser.roleId);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole(0);
    }

    setFormError(null); // Clear previous errors
    setPasswordError(null);
  }, [currentUser, open]);

  const handleSave = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !role ||
      !email.trim() ||
      !password.trim()
    ) {
      setFormError(
        t('users-dialog-missing-fields') ||
          'Please fill in all required fields.'
      );
      return;
    }

    setFormError(null); // Clear previous errors

    if (password !== confirmPassword && (password || '').length > 0) {
      const passwordConfirm = t('users-dialog-password-confirm');
      //setPasswordError('Passwords do not match');
      setPasswordError(passwordConfirm);
      return;
    }

    setPasswordError(''); // Clear any previous error

    let localResumeUrl = currentUser?.resumeUrl || '';

    if (resumeFile) {
      const uploadedUrl = await uploadResume(resumeFile as File);
      localResumeUrl = uploadedUrl; // Use the uploaded file URL
    }

    onSave({
      id: currentUser?.id,
      firstName,
      lastName,
      email,
      password: password || currentUser?.password || '',
      roleId: role,
      resumeUrl: localResumeUrl,
    });

    //clear the states
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {currentUser ? t('users-edit-title') : t('users-add-title')}
      </DialogTitle>
      <DialogContent>
        <TextField
          label={t('users-first-name')}
          margin="dense"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label={t('users-last-name')}
          margin="dense"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <HasRole role={1}>
          <Select
            fullWidth
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
            displayEmpty
            renderValue={(selected) =>
              selected
                ? roles.find((role) => role.id === Number(selected))?.name
                : t('users-select-role')
            }
          >
            <MenuItem value="" disabled>
              {t('users-select-role')}
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </HasRole>

        {role === 2 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              {t('users-upload-resume')}
            </Typography>

            <Button variant="outlined" component="label">
              {resumeFile ? t('users-change-file') : t('users-choose-file')}
              <input
                type="file"
                hidden
                /* accept=".pdf,.doc,.docx" */
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </Button>

            {resumeFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {resumeFile.name}
              </Typography>
            )}
          </Box>
        )}

        <TextField
          label={t('email')}
          margin="dense"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={currentUser ? t('users-update-password') : t('password')}
          margin="dense"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label={t('users-update-confirm-password')}
          margin="dense"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        {formError && (
          <Typography
            sx={{
              color: 'red',
              fontSize: '1rem',
            }}
          >
            {formError}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={handleSave}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersDialog;
