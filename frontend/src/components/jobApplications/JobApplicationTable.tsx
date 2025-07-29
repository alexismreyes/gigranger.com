import {
  Delete,
  Edit,
  MenuBookOutlined,
  PictureAsPdf,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import {
  Company,
  Job,
  JobApplication,
  Status,
  User,
} from '../../interfaces/interfaces';
import HasRole from '../HasRole';
import { useEffect, useState } from 'react';
import { usePaginationManagement } from '../../hooks/usePaginationManagement';
import JobApplicationDetails from './JobApplicationDetails';
import { useTranslation } from 'react-i18next';

interface JobApplicationTableProps {
  jobApplications: JobApplication[];
  onEdit: (jobApplication: JobApplication) => void;
  onDelete: (jobApplicationId: number) => void;
  companies: Company[];
  jobs: Job[];
  users: User[];
  statuses: Status[];
  showFilters: boolean;
}

const JobApplicationTable: React.FC<JobApplicationTableProps> = ({
  jobApplications,
  onEdit,
  onDelete,
  companies,
  jobs,
  users,
  statuses,
  showFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationManagement();

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [selectedJobApplication, setSelectedJobApplication] = useState<
    JobApplication | undefined
  >(undefined);
  const { t } = useTranslation();

  // ✅ Reset page when filtering, Resets to page 0 when searching, so results are always visible.
  useEffect(() => {
    handleChangePage(null, 0);
  }, [searchQuery]);

  // Filter jobs based on search query
  const filteredJobs = jobApplications.filter(
    (app) =>
      users
        .find((u) => u.id === app.userId)
        ?.firstName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      users
        .find((u) => u.id === app.userId)
        ?.lastName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      jobs
        .find((job) => job.id === app.jobId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      companies
        .find(
          (com) =>
            jobs.find((job) => job.id === app.jobId)?.companyId === com.id
        )
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      statuses
        .find((sta) => sta.id === app.statusId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Get jobs for the current page
  const paginatedJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDetails = (app: JobApplication) => {
    setOpenDetails(true);
    setSelectedJobApplication(app);
  };

  const handleCloseDialogDetails = () => {
    setOpenDetails(false);
    setSelectedJobApplication(undefined);
  };

  const showResume = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getStatusName = (statusId: number) => {
    switch (statusId) {
      case 1:
        return t('requested');
      case 2:
        return t('in-progress');
      case 3:
        return t('hired');
      case 4:
        return t('rejected');
      case 5:
        return t('resume-pending');
      default:
        return '';
    }
  };

  return (
    <TableContainer>
      {/* Search Input */}

      {showFilters && (
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
          }}
        >
          <TextField
            label={t('filters_job_application')}
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('job-application-applicant')}</TableCell>
            <TableCell>{t('job-application-resume')}</TableCell>
            <TableCell>{t('job-application-position')}</TableCell>
            <TableCell>{t('company')}</TableCell>
            <TableCell>{t('job-application-status')}</TableCell>
            <TableCell>{t('job-application-request-date')}</TableCell>
            <TableCell>{t('job-application-history')}</TableCell>

            <TableCell align="right">{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedJobs.map((app) => {
            // Find the job's company ID (assuming jobApplications have jobId & jobs have company_id)
            const job = jobs.find((job) => app.jobId === job.id);
            const companyName =
              companies.find((company) => job?.companyId === company.id)
                ?.name || 'Unknown';
            const applicant = users.find((u) => app.userId === u.id);
            const fullName = applicant
              ? `${applicant.firstName} ${applicant.lastName}`
              : 'Unknown';

            /* const statusName =
              statuses.find((sta) => app.statusId === sta.id)?.name ||
              'Unknown'; */

            //const requestDate = new Date(app.requestDate).toLocaleDateString();
            const requestDate = new Date(app.requestDate)
              .toISOString()
              .split('T')[0];

            return (
              <TableRow key={app.id}>
                <TableCell>{fullName}</TableCell>
                <TableCell>
                  {applicant?.resumeUrl && (
                    <IconButton
                      onClick={() => showResume(applicant?.resumeUrl as string)}
                    >
                      <PictureAsPdf />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>{job?.name}</TableCell>
                <TableCell>{companyName}</TableCell>
                {/* <TableCell>{statusName}</TableCell> */}
                <TableCell>{getStatusName(app.statusId)}</TableCell>
                <TableCell>{requestDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="success"
                    onClick={() => handleDetails(app)}
                  >
                    <MenuBookOutlined />
                  </IconButton>
                </TableCell>

                <TableCell align="right">
                  <HasRole role={[1, 3]}>
                    <IconButton color="primary" onClick={() => onEdit(app)}>
                      <Edit />
                    </IconButton>
                  </HasRole>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(app.id as number)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <JobApplicationDetails
        open={openDetails}
        selectedJobApplication={selectedJobApplication}
        onClose={handleCloseDialogDetails}
        jobs={jobs}
        users={users}
        statuses={statuses}
      />

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredJobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('rows-per-page')}
      />
    </TableContainer>
  );
};

export default JobApplicationTable;
