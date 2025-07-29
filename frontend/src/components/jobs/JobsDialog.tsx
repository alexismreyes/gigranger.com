import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Company, Job, JobCategory, User } from '../../interfaces/interfaces';
import { useCompaniesManagement } from '../../hooks/useCompaniesManagement';
import CompaniesDialog from '../companies/CompaniesDialog';
import { useTranslation } from 'react-i18next';

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
  const { companies, createCompany } = useCompaniesManagement();

  //logic for adding non existing companies
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { t } = useTranslation();

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

    // ✅ Clear form error each time the dialog opens or job changes
    setFormError(null);
  }, [currentJob, open]);

  const handleSave = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !requirements.trim() ||
      !company ||
      !jobCategory ||
      salary <= 0 ||
      vancancies <= 0
    ) {
      setFormError(
        t('jobs-dialog-missing-fields') || 'Please fill in all required fields.'
      );
      return;
    }

    setFormError(null); // Clear previous errors

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
      <DialogTitle>
        {currentJob ? t('jobs-edit-title') : t('jobs-add-title')}
      </DialogTitle>
      <DialogContent>
        <Select
          fullWidth
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value as number)}
          displayEmpty
          renderValue={(selected) =>
            selected
              ? jobCategories.find((cat) => cat.id === selected)?.name
              : t('jobs-dialog-category')
          }
        >
          <MenuItem value="" disabled>
            {t('jobs-dialog-category')}
          </MenuItem>
          {jobCategories
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>

        <TextField
          label={t('name')}
          margin="dense"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={t('description')}
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
              : t('jobs-dialog-company')
          }
        >
          <MenuItem value="" disabled>
            {t('jobs-dialog-company')}
          </MenuItem>
          {companies
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((com) => (
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
          + {t('jobs-dialog-add-company')}
        </Button>

        <TextField
          label={t('jobs-dialog-salary')}
          margin="dense"
          fullWidth
          value={salary}
          onChange={(e) => setSalary(parseInt(e.target.value))}
        />
        <TextField
          label={t('jobs-dialog-requirements')}
          margin="dense"
          fullWidth
          multiline
          rows={4} // Adjust the number of visible rows
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <TextField
          label={t('jobs-dialog-contact-email')}
          margin="dense"
          type="email"
          fullWidth
          value={emailContact}
          onChange={(e) => validateEmail(e.target.value)}
          error={errorEmail}
          helperText={errorEmail ? 'Invalid email format' : ''}
        />

        <TextField
          label={t('jobs-dialog-contact-phone')}
          margin="dense"
          type="email"
          fullWidth
          value={phoneContact}
          onChange={(e) => setPhoneContact(e.target.value)}
        />

        <TextField
          label={t('jobs-dialog-vacancies')}
          margin="dense"
          fullWidth
          type="number"
          value={vancancies}
          onChange={(e) => setVacancies(parseInt(e.target.value))}
        />

        {formError && (
          <Typography
            sx={{
              color: 'red',
            }}
          >
            {formError}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>

        <Button
          onClick={handleSave}
          disabled={errorEmail && emailContact !== ''}
        >
          {t('save')}
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
