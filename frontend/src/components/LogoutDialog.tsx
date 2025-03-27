import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          paddingX: 2,
          paddingTop: 2,
        },
      }}
    >
      {/* Title with icon */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'error.main',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        <LogoutIcon color="error" />
        Confirm Logout
      </DialogTitle>

      {/* Message content */}
      <DialogContent
        sx={{
          textAlign: 'center',
          py: 2,
        }}
      >
        <Typography fontSize="1rem" fontWeight={500}>
          Are you sure you want to log out from the{' '}
          <strong>Employment App</strong>?
        </Typography>
      </DialogContent>

      {/* Action buttons */}
      <DialogActions
        sx={{
          justifyContent: 'center',
          pb: 2,
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Confirm Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
