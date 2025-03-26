import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Company, Job, JobCategory, User } from '../../interfaces/interfaces';
import { useCompaniesManagement } from '../../hooks/useCompaniesManagement';
import CompaniesDialog from '../companies/CompaniesDialog';

interface JobsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
  currentJob?: Job | undefined | null;
  jobCategories: JobCategory[];
  user: User | null;
  refreshCompanies: () => Promise<void>;
}

const JobsDialog: React.FC<JobsDialogProps> = ({
  open,
  onClose,
  onSave,
  currentJob,
  jobCategories,
  user,
  refreshCompanies,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [emailContact, setEmailContact] = useState<string>('');
  const [phoneContact, setPhoneContact] = useState<string>('');
  const [vancancies, setVacancies] = useState<number>(0);
  const [company, setCompany] = useState<number>(0);
  const [salary, setSalary] = useState<number>(0);
  const [jobCategory, setJobCategory] = useState<number>(0);
  const { companies, fetchCompanies, createCompany } = useCompaniesManagement();

  //logic for adding non existing companies
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  //refresh companies
  const handleCompanyCreated = async (newCompany: Company) => {
    const addedCompany = await createCompany(newCompany);
    await refreshCompanies(); // ✅ You’ll add this below
    setCompany(addedCompany?.id as number); // Auto-select new company
    setOpenCompanyDialog(false);
  };

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setErrorEmail(!isValid);
    setEmailContact(value);
  };

  useEffect(() => {
    if (currentJob) {
      setName(currentJob.name);
      setDescription(currentJob.description);
      setCompany(currentJob.companyId);
      setSalary(currentJob.salary);
      setJobCategory(currentJob.categoryId);
      setRequirements(currentJob.requirements);
      setEmailContact(currentJob.emailContact);
      setPhoneContact(currentJob.phoneContact);
      setVacancies(currentJob.vacancies);
    } else {
      setName('');
      setDescription('');
      setCompany(0);
      setSalary(0);
      setJobCategory(0);
      setRequirements('');
      setEmailContact('');
      setPhoneContact('');
      setVacancies(0);
    }
  }, [currentJob]);

  const handleSave = () => {
    onSave({
      id: currentJob?.id,
      name,
      description,
      companyId: company,
      salary,
      categoryId: jobCategory,
      requirements: requirements,
      emailContact: emailContact,
      phoneContact: phoneContact,
      vacancies: vancancies,
      createdBy: user?.id as number,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentJob ? 'Edit a Job' : 'Add a Job'}</DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value as number)}
          displayEmpty
          renderValue={(selected) =>
            selected
              ? jobCategories.find((cat) => cat.id === selected)?.name
              : 'Select Category'
          }
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {jobCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Name"
          margin="dense"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          margin="dense"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select
          fullWidth
          value={company}
          onChange={(e) => setCompany(Number(e.target.value))}
          displayEmpty
          renderValue={(selected) =>
            selected
              ? companies.find((com) => com.id === Number(selected))?.name
              : 'Select Company'
          }
        >
          <MenuItem value="" disabled>
            Select Company
          </MenuItem>
          {companies.map((com) => (
            <MenuItem key={com.id} value={com.id}>
              {com.name}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={() => setOpenCompanyDialog(true)}
          size="small"
          color="primary"
          sx={{ mt: 1 }}
        >
          + Add Company
        </Button>

        <TextField
          label="Salary"
          margin="dense"
          fullWidth
          value={salary}
          onChange={(e) => setSalary(parseInt(e.target.value))}
        />
        <TextField
          label="requirements"
          margin="dense"
          fullWidth
          multiline
          rows={4} // Adjust the number of visible rows
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <TextField
          label="Email contact"
          margin="dense"
          type="email"
          fullWidth
          value={emailContact}
          onChange={(e) => validateEmail(e.target.value)}
          error={errorEmail}
          helperText={errorEmail ? 'Invalid email format' : ''}
        />

        <TextField
          label="Phone contact"
          margin="dense"
          type="email"
          fullWidth
          value={phoneContact}
          onChange={(e) => setPhoneContact(e.target.value)}
        />

        <TextField
          label="Vacancies"
          margin="dense"
          fullWidth
          type="number"
          value={vancancies}
          onChange={(e) => setVacancies(parseInt(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>

        <Button
          onClick={handleSave}
          disabled={errorEmail && emailContact !== ''}
        >
          SAVE
        </Button>
      </DialogActions>

      <CompaniesDialog
        open={openCompanyDialog}
        onClose={() => setOpenCompanyDialog(false)}
        onSave={handleCompanyCreated}
      />
    </Dialog>
  );
};

export default JobsDialog;
