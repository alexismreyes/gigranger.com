import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Job } from '../../interfaces/interfaces';
import { usePaginationManagement } from '../../hooks/usePaginationManagement';
import { Visibility } from '@mui/icons-material';
import JobDetails from '../jobs/JobsDetails';
import { useState } from 'react';
import { useJobCategoriesManagement } from '../../hooks/useJobCategoriesMangement';
import { useCompaniesManagement } from '../../hooks/useCompaniesManagement';
import useAuthContext from '../../hooks/useAuthContext';

interface JobMatchingProps {
  jobMatches: Job[];
}

const JobMatchingTable: React.FC<JobMatchingProps> = ({ jobMatches }) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationManagement();
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const { jobCategories } = useJobCategoriesManagement();
  const { companies } = useCompaniesManagement();
  const { user } = useAuthContext();

  const paginatedJobMatches = jobMatches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDetails = (job: Job) => {
    setOpenDetails(true);
    setSelectedJob(job);
  };

  const handleCloseDialogDetails = () => {
    setOpenDetails(false);
    setSelectedJob(undefined);
  };

  return (
    <TableContainer /* component={Paper} */>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Job Name</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Salary</strong>
            </TableCell>
            <TableCell>
              <strong>Match Score</strong>
            </TableCell>
            <TableCell>
              <strong>Details</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedJobMatches.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.name}</TableCell>
              <TableCell>{job.description}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell
                sx={{
                  color:
                    Number(job.score) <= 0.1
                      ? 'error.main' // Red (≤ 10%)
                      : Number(job.score) <= 0.3
                      ? 'orange' // Orange (10% – 30%)
                      : Number(job.score) <= 0.6
                      ? 'info.light' // Light Blue (30% – 60%)
                      : 'success.main', // Green (> 60%)
                  fontWeight: 'bold',
                }}
              >{`${(Number(job.score) * 100).toFixed(1)}%`}</TableCell>
              <TableCell>
                <IconButton color="warning" onClick={() => handleDetails(job)}>
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <JobDetails
        open={openDetails}
        job={selectedJob}
        onClose={handleCloseDialogDetails}
        jobCategories={jobCategories}
        companies={companies}
        user={user}
      />

      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={jobMatches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default JobMatchingTable;
