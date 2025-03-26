import { SnackStatus } from '../interfaces/interfaces';
import { Alert, Snackbar } from '@mui/material';

interface SnackBarProps {
  parentComponent: string;
  handleCloseSnack: () => void;
  snackStatus: SnackStatus;
}

const SnackBar: React.FC<SnackBarProps> = ({
  parentComponent,
  handleCloseSnack,
  snackStatus,
}) => {
  // ✅ Use `parentComponent` directly instead of setting it inside `useEffect`
  const parent =
    parentComponent === 'JobCategoriesList'
      ? 'Job Category'
      : parentComponent === 'JobsList'
      ? 'Job'
      : parentComponent === 'CompaniesList'
      ? 'Company'
      : parentComponent === 'Login' || parentComponent === 'UsersList'
      ? 'User'
      : parentComponent === 'JobApplicationsList' ||
        parentComponent === 'JobsDetails'
      ? 'Job Application'
      : parentComponent === 'JobApplicationsHistoryList'
      ? 'Job Application History'
      : undefined;

  return (
    <Snackbar
      open={snackStatus.open && snackStatus.source === parentComponent} // ✅ Control visibility here
      autoHideDuration={5000}
      onClose={handleCloseSnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleCloseSnack}
        severity={snackStatus.severity || 'success'}
        sx={{
          boxShadow:
            snackStatus.severity === 'success'
              ? '0 0 12px rgba(0, 255, 0, 0.4)'
              : '0 0 12px rgba(255, 0, 0, 0.4)',
          animation:
            snackStatus.severity === 'success'
              ? 'glowPulseGreen 1.8s infinite ease-in-out'
              : 'glowPulseRed 1.8s infinite ease-in-out',
          border:
            snackStatus.severity === 'success'
              ? '1px solid #4CAF50'
              : '1px solid #f44336',
        }}
      >
        {snackStatus.action === 'created'
          ? `${parent} added successfully`
          : snackStatus.action === 'updated'
          ? `${parent} updated successfully`
          : snackStatus.action === 'deleted'
          ? `${parent} deleted successfully`
          : snackStatus.message || 'An error ocurred'}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
