import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import UserRegistrationDialog from '../components/userRegistration/UserRegistrationDialog';
import { useAuthManagement } from '../hooks/useAuthManagement';
import { User } from '../interfaces/interfaces';
import { AxiosError } from 'axios';
import useSnackBarContext from '../hooks/useSnackBarContext';
import SnackBar from '../components/SnackBar';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [openNewUserDialog, setOpenNewUserDialog] = useState<boolean>(false);
  const { fetchLoggedUser, requestUserVerification } = useAuthManagement();
  const { snackStatus, handleCloseSnack } = useSnackBarContext();
  const { t } = useTranslation();

  useEffect(() => {
    //console.log('Error state updated:', error);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //prevents default submit behavior

    setError('');

    try {
      const userData = await fetchLoggedUser(email, password);
      if (userData?.token && userData?.user) {
        login(userData.token, userData.user);
        navigate('/');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        const errorMessage = error.response?.data.message;
        console.error('this->', message);
        const translated = t(message || 'server-failure', {
          defaultValue: errorMessage,
        });
        setError(translated);
      }
    }
  };

  const handleRegisterUser = async (user: User) => {
    try {
      await requestUserVerification(user);
      handleCloseDialog();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        const errorMessage = error.response?.data.message;
        console.error(message);
        const translated = t(message || 'server-failure', {
          defaultValue: errorMessage,
        });
        setError(translated);
        handleCloseDialog();
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenNewUserDialog(false);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Required for layering the overlay
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background image overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(https://pimwp.s3-accelerate.amazonaws.com/2022/11/job-search-apps-copy_dz6u.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          //opacity: 0.8, // adjust to your desired contrast
        }}
      />

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2,
        }}
      >
        <LanguageSwitcher />
      </Box>

      {/* Login form box - stays on top */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: '#fff', // ensure it's not transparent
          zIndex: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('login-title')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                /* label="Email" */
                label={t('email')}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('password')}
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                /* size="large" */
              >
                {t('login')}
              </Button>
            </Grid>
          </Grid>
          <a onClick={() => setOpenNewUserDialog(true)} href="#">
            {t('newuser')}
          </a>
        </form>
      </Box>

      <UserRegistrationDialog
        open={openNewUserDialog}
        onClose={handleCloseDialog}
        onSave={handleRegisterUser}
      />
      <SnackBar
        parentComponent="Login"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </Container>
  );
};

export default Login;
