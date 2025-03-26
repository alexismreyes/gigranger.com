import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Company } from '../../interfaces/interfaces';
import CompaniesForm from './CompaniesForm';

interface CompanyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
  currentCompany?: Company | undefined | null;
}

const CompaniesDialog: React.FC<CompanyDialogProps> = ({
  open,
  onClose,
  onSave,
  currentCompany,
}) => {
  const [initialValues, setInitialValues] = useState<Company>({
    name: '',
    address: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    foundationDate: '',
    employeesAvgNumber: 0,
    /* active: false,
    logoUrl: '', */
  });

  useEffect(() => {
    if (currentCompany) {
      setInitialValues(currentCompany);
    } else {
      setInitialValues({
        name: '',
        address: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        foundationDate: '',
        employeesAvgNumber: 0,
        /* active: false,
        logoUrl: '', */
      });
    }
  }, [currentCompany]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '600px',
          maxWidth: '95%',
        },
        textAlign: 'center',
      }}
    >
      <DialogTitle>
        {currentCompany ? 'Edit a Company' : 'Add a Company'}
      </DialogTitle>
      <DialogContent>
        <CompaniesForm
          initialValues={initialValues}
          onSave={onSave}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CompaniesDialog;
