import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { JobCategory } from '../../interfaces/interfaces';

interface JobCategoriesDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (jobCategory: JobCategory) => void;
  currentJobCategory?: JobCategory | undefined | null;
}

const JobCategoriesDialog: React.FC<JobCategoriesDialogProps> = ({
  open,
  onClose,
  onSave,
  currentJobCategory,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (currentJobCategory) {
      setName(currentJobCategory.name);
      setDescription(currentJobCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentJobCategory]);

  const handleSave = () => {
    onSave({
      id: currentJobCategory?.id,
      name,
      description,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {currentJobCategory ? 'Edit a Job Category' : 'Add a Job Category'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          margin="dense"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          margin="dense"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button onClick={handleSave}>SAVE</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobCategoriesDialog;
