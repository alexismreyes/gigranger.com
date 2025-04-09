import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import eyecandyTheme from './themes/theme.ts';
import { SnackBarProvider } from './context/SnackBarContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { MyOwnProvider } from './context/MyOwnContext.tsx';
import { LoadingProvider } from './context/LoadingContext.tsx';
import { ChatNotificationProvider } from './context/ChatNotificationContext.tsx';
import { FloatingChatProvider } from './context/FloatingChatContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <SnackBarProvider>
          <FloatingChatProvider>
            <ChatNotificationProvider>
              <ThemeProvider theme={eyecandyTheme}>
                <CssBaseline />
                <MyOwnProvider>
                  <App />
                </MyOwnProvider>
              </ThemeProvider>
            </ChatNotificationProvider>
          </FloatingChatProvider>
        </SnackBarProvider>
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>
);
