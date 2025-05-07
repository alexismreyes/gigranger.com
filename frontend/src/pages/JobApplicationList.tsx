import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Typography,
} from '@mui/material';
import SnackBar from '../components/SnackBar';
import { useEffect, useState } from 'react';
import { useJobApplicationManagement } from '../hooks/useJobApplicationManagement';
import useSnackBarContext from '../hooks/useSnackBarContext';
import {
  JobApplication,
  JobApplicationHistory,
} from '../interfaces/interfaces';
import JobApplicationTable from '../components/jobApplications/JobApplicationTable';
import { useCompaniesManagement } from '../hooks/useCompaniesManagement';
import { useJobsManagement } from '../hooks/useJobsManagement';
import { useUsersManagement } from '../hooks/useUsersManagement';
import { useStatusManagement } from '../hooks/useStatusManagement';
import JobApplicationDialog from '../components/jobApplications/JobApplicationDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useJobApplicationHistoryManagement } from '../hooks/useJobApplicationHistoryManagement';
import useAuthContext from '../hooks/useAuthContext';
import { useTranslation } from 'react-i18next';

const JobApplicationsList: React.FC = () => {
  const { jobApplications, updateJobApplication, deleteJobApplication } =
    useJobApplicationManagement();
  const { createJobApplicationHistory } = useJobApplicationHistoryManagement();
  const { jobs } = useJobsManagement();
  const { users } = useUsersManagement();
  const { companies } = useCompaniesManagement();
  const { statuses } = useStatusManagement();
  const { user } = useAuthContext();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showResumeAlert, setShowResumeAlert] = useState(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const [currentJobApplication, setCurrentJobApplication] = useState<
    JobApplication | undefined
  >(undefined);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);
  const [jobApplicationToDelete, setJobApplicationToDelete] =
    useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (
      user?.roleId === 2 &&
      (!user?.resumeUrl || user.resumeUrl.trim() === '')
    ) {
      setShowResumeAlert(true);
    } else {
      setShowResumeAlert(false);
    }
  }, [user]);

  const handleOpenDialog = (jobApplication?: JobApplication | undefined) => {
    setCurrentJobApplication(jobApplication);
    setDialogOpen(true);
  };

  const handleSave = async (jobApplication: JobApplication) => {
    if (jobApplication) {
      const isUpdated = await updateJobApplication(jobApplication);
      handleCloseDialog();

      if (isUpdated) {
        //const now = new Date().toLocaleDateString();
        const now = new Date().toISOString().split('T')[0];

        const jobApplicationHistory: JobApplicationHistory = {
          jobAppId: jobApplication.id as number,
          updatedBy: user?.id as number,
          updatedAt: now,
          comment: jobApplication.comment as string,
          updatedStatus: jobApplication.statusId,
        };

        await createJobApplicationHistory(jobApplicationHistory);
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentJobApplication(undefined);
  };

  const handleRequestDelete = (jobApplicationId: number) => {
    setConfirmationDialogOpen(true);
    setJobApplicationToDelete(jobApplicationId);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteJobApplication(jobApplicationToDelete);
    setConfirmationDialogOpen(false);
  };

  return (
    <Container>
      {showResumeAlert && (
        <Alert
          severity="warning"
          variant="outlined"
          onClose={() => setShowResumeAlert(false)}
          sx={{
            backgroundColor: '#fdecea',
            position: 'absolute',
            top: 80,
            right: 16,
            width: '350px',
            zIndex: 10,
            boxShadow: '0 0 12px rgba(255, 0, 0, 0.4)',
            animation: 'glowPulseRed 1.8s infinite ease-in-out',
            border: '1px solid #f44336',
          }}
        >
          <AlertTitle>Missing Resume</AlertTitle>
          {t('job-application-upload-resume')}
        </Alert>
      )}
      <Typography variant="h5">{t('job-application-title')}</Typography>

      <Button
        variant="contained"
        onClick={() => setShowFilters(!showFilters)}
        sx={{ ml: 1 }}
        color="info"
      >
        {showFilters ? t('filters_hide') : t('filters_show')}
      </Button>

      <JobApplicationTable
        jobApplications={jobApplications}
        onEdit={handleOpenDialog}
        onDelete={handleRequestDelete}
        companies={companies}
        jobs={jobs}
        users={users}
        statuses={statuses}
        showFilters={showFilters}
      />

      <JobApplicationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        currentJobApplication={currentJobApplication}
        statuses={statuses}
      />

      <ConfirmationDialog
        open={confirmationDialogOpen}
        title={t('confirm-deletion')}
        message={t('jobs-application-dialog-delete-content')}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />

      <SnackBar
        parentComponent="JobApplicationsList"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </Container>
  );
};

export default JobApplicationsList;
