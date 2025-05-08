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
import { Company } from '../../interfaces/interfaces';
import { Delete, Edit } from '@mui/icons-material';
import HasRole from '../HasRole';
import { usePaginationManagement } from '../../hooks/usePaginationManagement';
import { useTranslation } from 'react-i18next';

interface CompaniesProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (companyId: number) => void;
}

const CompaniesTable: React.FC<CompaniesProps> = ({
  companies,
  onEdit,
  onDelete,
}) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationManagement();

  const { t } = useTranslation();

  // Get jobs for the current page
  const paginatedCompanies = companies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer sx={{ width: '80vw' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('company-address')}</TableCell>
            <TableCell>{t('description')}</TableCell>
            <TableCell>{t('email')}</TableCell>
            <TableCell>{t('company-phone')}</TableCell>
            <TableCell>{t('company-website')}</TableCell>
            <TableCell>{t('company-foundation-date')}</TableCell>
            <TableCell>{t('company-avg-employees')}</TableCell>
            {/* <TableCell>Active?</TableCell> */}
            <HasRole role={1}>
              <TableCell align="right">{t('actions')}</TableCell>
            </HasRole>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCompanies.map((com) => (
            <TableRow key={com.id}>
              <TableCell>{com.name}</TableCell>
              <TableCell>{com.address}</TableCell>
              <TableCell>{com.description}</TableCell>
              <TableCell>{com.email}</TableCell>
              <TableCell>{com.phone}</TableCell>
              <TableCell>{com.website}</TableCell>
              <TableCell>{com.foundationDate.split('T')[0]}</TableCell>
              <TableCell>{com.employeesAvgNumber}</TableCell>
              {/* <TableCell>{com.active ? 'yes' : 'no'}</TableCell> */}
              <TableCell align="right">
                <HasRole role={1}>
                  <IconButton color="primary" onClick={() => onEdit(com)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(com.id as number)}
                  >
                    <Delete />
                  </IconButton>
                </HasRole>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('rows-per-page')}
      />
    </TableContainer>
  );
};

export default CompaniesTable;
