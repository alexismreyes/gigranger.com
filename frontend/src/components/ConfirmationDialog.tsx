import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        <DialogActions>
          <Button onClick={() => onCancel()}>CANCEL</Button>
          <Button onClick={() => onConfirm()}>PROCEED</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
