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
import {
  Company,
  Job,
  JobCategory,
  JobFilterState,
  User,
} from '../../interfaces/interfaces';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { usePaginationManagement } from '../../hooks/usePaginationManagement';
import JobDetails from './JobsDetails';
import HasRole from '../HasRole';
import JobsFilters from './JobsFilters';
import { useTranslation } from 'react-i18next';

interface JobsProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: number) => void;
  jobCategories: JobCategory[];
  companies: Company[];
  user: User | null;
  showFilters: boolean;
}

const JobsTable: React.FC<JobsProps> = ({
  jobs,
  onEdit,
  onDelete,
  jobCategories,
  companies,
  user,
  showFilters,
}) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationManagement();

  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  //filters
  const [filters, setFilters] = useState<JobFilterState>({
    searchQuery: '',
    selectedCategory: '',
    selectedCompany: '',
    minSalary: '',
    maxSalary: '',
  });

  const { t } = useTranslation();

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    handleChangePage(null, 0); // Reset pagination on filter change
  };

  const handleDetails = (job: Job) => {
    setOpenDetails(true);
    setSelectedJob(job);
  };

  const handleCloseDialogDetails = () => {
    setOpenDetails(false);
    setSelectedJob(undefined);
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const categoryMatch =
      !filters.selectedCategory ||
      job.categoryId === Number(filters.selectedCategory);

    const companyMatch =
      !filters.selectedCompany ||
      job.companyId === Number(filters.selectedCompany);

    const searchMatch =
      job.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      companies
        .find((com) => job.companyId === com.id)
        ?.name.toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const minSalaryMatch =
      !filters.minSalary || job.salary >= Number(filters.minSalary);

    const maxSalaryMatch =
      !filters.maxSalary || job.salary <= Number(filters.maxSalary);

    return (
      categoryMatch &&
      companyMatch &&
      searchMatch &&
      minSalaryMatch &&
      maxSalaryMatch
    );
  });

  // Get jobs for the current page
  const paginatedJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer>
      {showFilters && (
        <JobsFilters
          jobCategories={jobCategories}
          companies={companies}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('category')}</TableCell>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('company')}</TableCell>
            <TableCell>{t('jobs-salary')}</TableCell>
            <HasRole role={[1, 3]}>
              <TableCell align="right">{t('actions')}</TableCell>
            </HasRole>
            <TableCell>{t('jobs-details')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedJobs.map((job) => {
            const category = jobCategories.find(
              (cat) => job.categoryId === cat.id
            );

            const company = companies.find((com) => job.companyId === com.id);

            return (
              <TableRow key={job.id}>
                <TableCell>{category ? category.name : 'Unknown'}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{company ? company.name : 'Unknown'}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <HasRole role={[1, 3]}>
                  <TableCell align="right">
                    {(job.createdBy === user?.id || user?.roleId === 1) && (
                      <>
                        <IconButton color="primary" onClick={() => onEdit(job)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            job.id !== undefined && onDelete(job.id)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </HasRole>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => handleDetails(job)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
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
export default JobsTable;
