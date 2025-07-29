import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  // ✅ Use `parentComponent` directly instead of setting it inside `useEffect`
  const parent =
    parentComponent === 'JobCategoriesList'
      ? t('category')
      : parentComponent === 'JobsList'
      ? t('job')
      : parentComponent === 'CompaniesList'
      ? t('company')
      : parentComponent === 'Login' || parentComponent === 'UsersList'
      ? t('user')
      : parentComponent === 'JobApplicationsList' ||
        parentComponent === 'JobsDetails'
      ? t('snackbar-parent-job-application')
      : parentComponent === 'JobApplicationsHistoryList'
      ? t('snackbar-parent-job-application-history')
      : parentComponent === 'JobMatchingList'
      ? t('snackbar-parent-job-matching')
      : parentComponent === 'Chat'
      ? t('snackbar-parent-chat')
      : undefined;

  return (
    <Snackbar
      open={snackStatus.open && snackStatus.source === parentComponent} // ✅ Control visibility here
      autoHideDuration={15000}
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
              : snackStatus.severity === 'error'
              ? '0 0 12px rgba(255, 0, 0, 0.4)'
              : '0 0 16px rgba(255, 223, 0, 0.9)',

          animation:
            snackStatus.severity === 'success'
              ? 'glowPulseGreen 1.8s infinite ease-in-out'
              : snackStatus.severity === 'error'
              ? 'glowPulseRed 1.8s infinite ease-in-out'
              : 'glowPulseYellow 1.8s infinite ease-in-out',

          border:
            snackStatus.severity === 'success'
              ? '1px solid #4CAF50'
              : snackStatus.severity === 'error'
              ? '1px solid #f44336'
              : '1px solid rgba(255, 223, 0, 1)',
        }}
      >
        {snackStatus.action === 'created'
          ? `${parent} ${t('snackbar-added')}`
          : snackStatus.action === 'updated'
          ? `${parent} ${t('snackbar-updated')}`
          : snackStatus.action === 'deleted'
          ? `${parent} ${t('snackbar-deleted')}`
          : snackStatus.action === 'nonewchat'
          ? `${parent} - ${t('snackbar-action-chat')}`
          : snackStatus.action === 'no-resume'
          ? `${parent} - ${snackStatus.message}`
          : snackStatus.message || t('snackbar-error')}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
