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
      : parentComponent === 'JobMatchingList'
      ? 'Job Matching Service'
      : parentComponent === 'Chat'
      ? 'Chat service'
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
          ? `${parent} added successfully`
          : snackStatus.action === 'updated'
          ? `${parent} updated successfully`
          : snackStatus.action === 'deleted'
          ? `${parent} deleted successfully`
          : snackStatus.action === 'nonewchat'
          ? `${parent} - No unread chats yet. Go to a job application and click "💬 Start Chat"
          to continue your conversation.`
          : snackStatus.action === 'no-resume'
          ? `${parent} - ${snackStatus.message}`
          : snackStatus.message || 'An error ocurred'}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
