import { useEffect, useState } from 'react';
import CompaniesTable from '../components/companies/CompaniesTable';
import { useCompaniesManagement } from '../hooks/useCompaniesManagement';
import { Company } from '../interfaces/interfaces';
import { Button, Container, Typography } from '@mui/material';
import CompaniesDialog from '../components/companies/CompaniesDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SnackBar from '../components/SnackBar';
import useSnackBarContext from '../hooks/useSnackBarContext';
import useAuthContext from '../hooks/useAuthContext';
import HasRole from '../components/HasRole';
import useMyOwnContext from '../hooks/useMyOwnContext';

const CompaniesList: React.FC = () => {
  const { companies, updateCompany, createCompany, deleteCompany } =
    useCompaniesManagement();
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);
  const [companyToDelete, setCompanyToDelete] = useState<number>(0);
  const { snackStatus, handleCloseSnack } = useSnackBarContext();

  //use our own context
  /* const { getTime } = useMyOwnContext(); */

  const handleOpenDialog = (company?: Company | undefined) => {
    setCurrentCompany(company);
    setDialogOpen(true);
  };

  const handleSave = async (company: Company) => {
    if (currentCompany) await updateCompany(company);
    else await createCompany(company);

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentCompany(undefined);
  };

  const handleRequestDelete = (companyId: number) => {
    setConfirmationDialogOpen(true);
    setCompanyToDelete(companyId);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteCompany(companyToDelete);
    setConfirmationDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5">COMPANIES LIST</Typography>

      <HasRole role={[1, 3]}>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add a Company
        </Button>
      </HasRole>

      {/* <Button
        variant="contained"
        onClick={() => getTime()}
        sx={{ marginLeft: '1rem' }}
        color="warning"
      >
        Get Time!!
      </Button> */}

      <CompaniesTable
        companies={companies}
        onEdit={handleOpenDialog}
        onDelete={handleRequestDelete}
      />

      <CompaniesDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        currentCompany={currentCompany}
      />

      <ConfirmationDialog
        open={confirmationDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete the selected Company?"
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />

      <SnackBar
        parentComponent="CompaniesList"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </Container>
  );
};

export default CompaniesList;
