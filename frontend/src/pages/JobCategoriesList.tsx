import { Button, Container, Typography } from '@mui/material';
import JobCategoriesTable from '../components/jobCategories/JobCategoriesTable';
import { useJobCategoriesManagement } from '../hooks/useJobCategoriesMangement';
import JobCategoriesDialog from '../components/jobCategories/JobCategoriesDialog';
import { useState } from 'react';
import { JobCategory } from '../interfaces/interfaces';
import ConfirmationDialog from '../components/ConfirmationDialog';
import useSnackBarContext from '../hooks/useSnackBarContext';
import SnackBar from '../components/SnackBar';
import HasRole from '../components/HasRole';
import { useTranslation } from 'react-i18next';

const JobCategoriesList: React.FC = () => {
  const {
    jobCategories,
    createJobCategory,
    updateJobCategory,
    deleteJobCategory,
  } = useJobCategoriesManagement();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);
  const [currentJobCategory, setCurrentJobCategory] = useState<
    JobCategory | undefined | null
  >(undefined);
  const [jobCategoryToDelete, setJobCategoryToDelete] = useState<number>(0);
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { t } = useTranslation();

  const handleOpenDialog = (jobCategory?: JobCategory | null) => {
    setCurrentJobCategory(jobCategory);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentJobCategory(null);
  };

  const handleSave = async (jobCategory: JobCategory) => {
    if (currentJobCategory) {
      await updateJobCategory(jobCategory);
    } else {
      await createJobCategory(jobCategory);
    }
    handleCloseDialog();
  };

  const handleRequestDelete = (jobCategoryId: number) => {
    setConfirmationDialogOpen(true);
    setJobCategoryToDelete(jobCategoryId);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteJobCategory(jobCategoryToDelete);
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <Container>
        <Typography variant="h5">{t('job-categories-title')}</Typography>
        <HasRole role={1}>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            {t('job-categories-add')}
          </Button>
        </HasRole>
        <JobCategoriesTable
          jobCategories={jobCategories}
          onEdit={handleOpenDialog}
          onDelete={handleRequestDelete}
        />
        <JobCategoriesDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSave}
          currentJobCategory={currentJobCategory}
        />

        <ConfirmationDialog
          open={confirmationDialogOpen}
          title={t('confirm-deletion')}
          message={t('job-categories-dialog-delete-content')}
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />

        <SnackBar
          parentComponent="JobCategoriesList"
          handleCloseSnack={handleCloseSnack}
          snackStatus={snackStatus}
        />
      </Container>
    </>
  );
};

export default JobCategoriesList;
