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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

  const getStatusDescription = (id?: number) => {
    switch (id) {
      case 1:
        return t('requested-description');
      case 2:
        return t('in-progress-description');
      case 3:
        return t('hired-description');
      case 4:
        return t('rejected-description');
      case 5:
        return t('resume-pending-description');
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('job-application-dialog-title')}</DialogTitle>
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
              {/* {sta.name} - {sta.description} */}
              {sta.name} &nbsp; - &nbsp;
              <span style={{ color: 'orange' }}>
                {getStatusDescription(sta.id)}
              </span>
            </MenuItem>
          ))}
        </Select>

        <TextField
          label={t('job-application-dialog-reason')}
          margin="dense"
          multiline
          rows={4} // Adjust the number of visible rows
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={handleSave}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobApplicationDialog;
