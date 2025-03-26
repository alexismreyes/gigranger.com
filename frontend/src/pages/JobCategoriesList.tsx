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
        <Typography variant="h5">JOB CATEGORIES LIST</Typography>
        <HasRole role={1}>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Job Category
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
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected Job Category?"
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
