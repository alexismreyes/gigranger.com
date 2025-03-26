import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Job } from '../interfaces/interfaces';
import ConfirmationDialog from '../components/ConfirmationDialog';
import useSnackBarContext from '../hooks/useSnackBarContext';
import SnackBar from '../components/SnackBar';
import { useJobsManagement } from '../hooks/useJobsManagement';
import JobsTable from '../components/jobs/JobsTable';
import JobsDialog from '../components/jobs/JobsDialog';
import { useJobCategoriesManagement } from '../hooks/useJobCategoriesMangement';

import { useCompaniesManagement } from '../hooks/useCompaniesManagement';
import useAuthContext from '../hooks/useAuthContext';
import HasRole from '../components/HasRole';

const JobsList: React.FC = () => {
  const { jobs, createJob, updateJob, deleteJob } = useJobsManagement();
  const { jobCategories } = useJobCategoriesManagement();
  const { companies, fetchCompanies } = useCompaniesManagement();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<Job | undefined | null>(
    undefined
  );
  const [jobToDelete, setJobToDelete] = useState<number>(0);
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { user } = useAuthContext();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleOpenDialog = (job?: Job | null) => {
    setCurrentJob(job);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentJob(null);
  };

  const handleSave = async (job: Job) => {
    if (currentJob) {
      await updateJob(job);
    } else {
      await createJob(job);
    }
    handleCloseDialog();
  };

  const handleRequestDelete = (jobId: number) => {
    setConfirmationDialogOpen(true);
    setJobToDelete(jobId);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteJob(jobToDelete);
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <Container>
        <Typography variant="h5">JOBS LIST</Typography>

        <HasRole role={[1, 3]}>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Job
          </Button>
        </HasRole>

        <Button
          variant="contained"
          onClick={() => setShowFilters(!showFilters)}
          sx={{ ml: 1 }}
          color="info"
        >
          {showFilters ? 'Hide' : 'Show'} filters
        </Button>

        <JobsTable
          jobs={jobs}
          onEdit={handleOpenDialog}
          onDelete={handleRequestDelete}
          jobCategories={jobCategories}
          companies={companies}
          user={user}
          showFilters={showFilters}
        />
        <JobsDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSave}
          currentJob={currentJob}
          jobCategories={jobCategories}
          user={user}
          refreshCompanies={fetchCompanies}
        />

        <ConfirmationDialog
          open={confirmationDialogOpen}
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected Job?"
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />

        <SnackBar
          parentComponent="JobsList"
          handleCloseSnack={handleCloseSnack}
          snackStatus={snackStatus}
        />
      </Container>
    </>
  );
};

export default JobsList;
