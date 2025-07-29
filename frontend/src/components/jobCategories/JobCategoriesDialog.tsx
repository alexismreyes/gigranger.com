import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { JobCategory } from '../../interfaces/interfaces';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (currentJobCategory) {
      setName(currentJobCategory.name);
      setDescription(currentJobCategory.description);
    } else {
      setName('');
      setDescription('');
    }

    setFormError(null);
  }, [currentJobCategory, open]);

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      setFormError(
        t('jobs-categories-missing-fields') ||
          'Please fill in all required fields.'
      );
      return;
    }

    setFormError(null); // Clear previous errors

    onSave({
      id: currentJobCategory?.id,
      name,
      description,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {currentJobCategory
          ? t('job-categories-edit-title')
          : t('job-categories-add-title')}
      </DialogTitle>
      <DialogContent>
        <TextField
          label={t('name')}
          margin="dense"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={t('description')}
          margin="dense"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default JobCategoriesDialog;
