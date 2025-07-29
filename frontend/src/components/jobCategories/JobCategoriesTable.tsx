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
import { JobCategory } from '../../interfaces/interfaces';
import { Delete, Edit } from '@mui/icons-material';
import HasRole from '../HasRole';
import { usePaginationManagement } from '../../hooks/usePaginationManagement';
import { useTranslation } from 'react-i18next';

interface JobCategoriesProps {
  jobCategories: JobCategory[];
  onEdit: (jobCategory: JobCategory) => void;
  onDelete: (jobCategoryId: number) => void;
}

const JobCategoriesTable: React.FC<JobCategoriesProps> = ({
  jobCategories,
  onEdit,
  onDelete,
}) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationManagement();

  const { t } = useTranslation();

  // Get jobs for the current page
  const paginatedJobCategories = jobCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('description')}</TableCell>
            <HasRole role={1}>
              <TableCell align="right">{t('actions')}</TableCell>
            </HasRole>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {jobCategories.map((cat) => ( */}
          {paginatedJobCategories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description}</TableCell>
              <HasRole role={1}>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit(cat)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(cat.id as number)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </HasRole>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('rows-per-page')}
      />
    </TableContainer>
  );
};
export default JobCategoriesTable;
