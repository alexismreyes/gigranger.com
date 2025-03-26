import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { JobApplication, Status } from '../../interfaces/interfaces';

interface JobApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (jobApplication: JobApplication) => void;
  currentJobApplication?: JobApplication;
  statuses: Status[];
}

const JobApplicationDialog: React.FC<JobApplicationDialogProps> = ({
  open,
  onClose,
  onSave,
  currentJobApplication,
  statuses,
}) => {
  const [status, setStatus] = useState<number>(0);
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (currentJobApplication) {
      setStatus(currentJobApplication.statusId);
      setReason('');
    }
  }, [currentJobApplication]);

  const handleSave = () => {
    if (currentJobApplication) {
      onSave({
        id: currentJobApplication?.id,
        userId: currentJobApplication?.userId,
        jobId: currentJobApplication?.jobId,
        statusId: status,
        requestDate: currentJobApplication.requestDate,
        comment: reason,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Status</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          renderValue={(selected) =>
            selected
              ? statuses.find((sta) => sta.id === Number(selected))?.name
              : 'Select Status'
          }
        >
          {statuses.map((sta) => (
            <MenuItem key={sta.id} value={sta.id}>
              {sta.name} - {sta.description}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Reason"
          margin="dense"
          multiline
          rows={4} // Adjust the number of visible rows
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button onClick={handleSave}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobApplicationDialog;
