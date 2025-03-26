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
  const [passwordError, setPasswordError] = useState<string>('');
  const [role, setRole] = useState<number | string>(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

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
  }, [currentUser]);

  const handleSave = async () => {
    if (password !== confirmPassword && (password || '').length > 0) {
      setPasswordError('Passwords do not match');
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
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentUser ? 'Edit a User' : 'Add a User'}</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          margin="dense"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
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
                : 'Select Role'
            }
          >
            <MenuItem value="" disabled>
              Select Role
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
            <Typography variant="subtitle2">Upload Resume</Typography>

            <Button variant="outlined" component="label">
              {resumeFile ? 'Change File' : 'Choose File'}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
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
          label="Email"
          margin="dense"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={
            currentUser
              ? 'password - leave it empty to keep the same password'
              : 'Password'
          }
          margin="dense"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          margin="dense"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button onClick={handleSave}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersDialog;
