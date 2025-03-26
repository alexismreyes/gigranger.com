import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import axios, { AxiosError } from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState<string>('');
  const hasVerified = useRef(false); // ⛔ prevents duplicate calls, if we dont use this, this component calls the api twice and we get an error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verifyemail?token=${token}`
        );
        setStatus('success');
        setMessage(response.data.message);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setMessage(error.response?.data.error || 'Verification failed.');
        }
        setStatus('error');
      }
    };

    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verifyEmail();
    } else if (!token) {
      setStatus('error');
      setMessage('No token provided.');
    }
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {status === 'success' ? 'Welcome!' : 'Oops!'}
        </Typography>

        <Box display="flex" justifyContent="center" my={2}>
          {status === 'loading' ? (
            <CircularProgress />
          ) : (
            <img
              src={
                status === 'success'
                  ? '/images/email_verified.svg'
                  : '/images/email_error.svg'
              }
              alt="Email status"
              style={{ width: '70%', maxWidth: '300px' }}
            />
          )}
        </Box>

        <Alert severity={status} sx={{ my: 2 }}>
          {message}
        </Alert>

        {status === 'success' && (
          <Button
            variant="contained"
            color="primary"
            href="/login"
            sx={{ mt: 2 }}
          >
            Proceed to Login
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
