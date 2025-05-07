import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Job, JobApplication, Status, User } from '../../interfaces/interfaces';
import { useJobApplicationHistoryManagement } from '../../hooks/useJobApplicationHistoryManagement';
import { useEffect } from 'react';
import JobApplicationChat from './JobApplicationChat';
import { useTranslation } from 'react-i18next';

interface JobApplicationDetailsProps {
  open: boolean;
  selectedJobApplication: JobApplication | undefined;
  onClose: () => void;
  jobs: Job[];
  users: User[];
  statuses: Status[];
}

const JobApplicationDetails: React.FC<JobApplicationDetailsProps> = ({
  open,
  selectedJobApplication,
  onClose,
  jobs,
  users,
  statuses,
}) => {
  const { jobApplicationsHistory, fetchJobApplicationsHistory } =
    useJobApplicationHistoryManagement();

  const { t } = useTranslation();

  useEffect(() => {
    fetchJobApplicationsHistory();
  }, [open, selectedJobApplication]);

  if (!selectedJobApplication) return null; // If no job application is selected, don't render anything

  const filteredjobsApplicationsHistory = jobApplicationsHistory.filter(
    (app) => app.jobAppId === selectedJobApplication?.id
  );

  const lastUpdate = filteredjobsApplicationsHistory.slice(-1)[0] || []; // Get latest history
  const recruiterId = lastUpdate.updatedBy ?? null;
  const jobSeekerId = selectedJobApplication.userId;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('job-application-position')}</TableCell>
                  <TableCell>{t('job-application-history-status')}</TableCell>
                  <TableCell>
                    {t('job-application-history-updated-by')}
                  </TableCell>
                  <TableCell>
                    {t('job-application-history-updated-at')}
                  </TableCell>
                  <TableCell>{t('job-application-history-comment')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredjobsApplicationsHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ color: 'red' }}>
                      <h4>{t('job-application-history-content')}</h4>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredjobsApplicationsHistory.map((app) => {
                    const jobName = jobs.find(
                      (job) => job.id === selectedJobApplication.jobId
                    )?.name;

                    /* const currentStatus = statuses.find(
                      (status) => status.id === app.updatedStatus
                    )?.name; */

                    let currentStatus = '';
                    switch (app.updatedStatus) {
                      case 1:
                        currentStatus = t('requested');
                        break;
                      case 2:
                        currentStatus = t('in-progress');
                        break;
                      case 3:
                        currentStatus = t('hired');
                        break;
                      case 4:
                        currentStatus = t('rejected');
                        break;
                      case 5:
                        currentStatus = t('resume-pending');
                        break;
                    }

                    //recruiter name
                    const firstName = users.find(
                      (u) => u.id === app.updatedBy
                    )?.firstName;
                    const lastName = users.find(
                      (u) => u.id === app.updatedBy
                    )?.lastName;

                    /*const updatedAt = new Date(
                      app.updatedAt
                    ).toLocaleDateString();*/

                    const updatedAt = new Date(app.updatedAt)
                      .toISOString()
                      .split('T')[0];

                    return (
                      <TableRow key={app.id}>
                        <TableCell>{jobName}</TableCell>
                        <TableCell>{currentStatus}</TableCell>
                        <TableCell>
                          {firstName} {lastName}
                        </TableCell>
                        <TableCell>{updatedAt}</TableCell>
                        <TableCell>{app.comment}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="error">
              {t('close')}
            </Button>
            {filteredjobsApplicationsHistory.length > 0 &&
              lastUpdate.updatedStatus === 2 && ( //si el status de la aplicacion esta en progreso muestre el boton para chat
                <JobApplicationChat
                  recruiterId={recruiterId}
                  jobSeekerId={jobSeekerId}
                />
              )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplicationDetails;
