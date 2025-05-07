import { Box, CircularProgress, Typography } from '@mui/material';
import useLoadingContext from '../hooks/useLoadingContext';
import { useTranslation } from 'react-i18next';

interface GlobalLoaderProps {
  context: string;
  inline?: boolean; // to support spinner inside buttons
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  context,
  inline = false,
}) => {
  const { isLoading } = useLoadingContext();
  const { t } = useTranslation();

  const loadingMessages: Record<string, string> = {
    'job-matching': t('job-matching-researching'),
    default: t('retrieving-data'),
  };

  const message = loadingMessages[context] || loadingMessages.default;

  if (!isLoading) return null;

  //for inline (inside button) text
  if (inline) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={16} color="inherit" />
        <Typography variant="caption">{message}</Typography>
      </Box>
    );
  }

  //this section loads if the inline argument is not send to render the loading component overlaying the whole screen
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={60} color="primary" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default GlobalLoader;
