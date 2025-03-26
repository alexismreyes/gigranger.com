import {
  Box,
  Button,
  Dialog,
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

  useEffect(() => {
    fetchJobApplicationsHistory();
  }, [open, selectedJobApplication]);

  if (!selectedJobApplication) return null; // If no job application is selected, don't render anything

  const filteredjobsApplicationsHistory = jobApplicationsHistory.filter(
    (app) => app.jobAppId === selectedJobApplication?.id
  );

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
                  <TableCell>Position</TableCell>
                  <TableCell>Current Status</TableCell>
                  <TableCell>Updated By</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredjobsApplicationsHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ color: 'red' }}>
                      <h4>
                        This job application has not been reviewed just yet
                      </h4>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredjobsApplicationsHistory.map((app) => {
                    const jobName = jobs.find(
                      (job) => job.id === selectedJobApplication.jobId
                    )?.name;

                    const currentStatus = statuses.find(
                      (status) => status.id === app.updatedStatus
                    )?.name;

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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplicationDetails;
