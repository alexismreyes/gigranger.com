import { createTheme } from '@mui/material';

const eyecandyTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6B6B',
    },
    success: {
      main: '#28A745', // Green for success messages
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFC107', // Yellow for warnings
      contrastText: '#000000',
    },
    error: {
      main: '#DC3545', // Red for errors
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#17A2B8', // Cyan for informational messages
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E1E1E',
      secondary: '#606770',
    },
  },
  typography: {
    fontFamily: `'Play', 'Arial', sans-serif`,
    fontSize: 15,
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      color: '#007AFF',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#FF6B6B',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          textTransform: 'none',
          transition: '0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          marginBottom: '1rem',
          marginTop: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          borderRadius: 10, // Cards should have rounded corners
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    /* APPBAR & TOOLBAR */
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          background: 'linear-gradient(to right, #2a5298, #007AFF)',
          backdropFilter: 'blur(1px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          transition: 'width 0.2s ease-in-out, margin 0.3s ease-in-out',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',

          '& .MuiTypography-h4': {
            color: '#FFD700',
            marginLeft: '8px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              cursor: 'default',
            },
          },
          '& .MuiIconButton-root': {
            //color: '#fff',
            marginRight: '8px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },

          '& .drawer-toggle-btn': {
            color: '#fff',
            marginRight: '8px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
          '& .MuiTypography-body1': {
            color: '#FFD700',
            marginLeft: '8px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              cursor: 'default',
            },
          },
        },
      },
    },

    /* DRAWER */

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 170,
          borderRadius: 0,
          backgroundColor: 'rgba(30, 30, 30, 0.5)', // dark overlay
          backdropFilter: 'blur(5px)',
          color: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.2)',
          overflowX: 'hidden',
          transition: 'width 0.3s ease-in-out',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#1976d2',
            transform: 'scale(1.1)',
            backgroundColor: '#f5f5f5',
            transition: 'all 0.3s ease ',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '16px',
          fontWeight: '1000',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 35,
        },
      },
    },

    /* INPUTS */
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // smaller font
          color: '#333',
          backgroundColor: '#fff', // force white inputs
          borderRadius: 6,
          padding: '2px 8px',
          '&.Mui-disabled': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
          color: '#555',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '4px',
          marginBottom: '4px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },

    /* TABLES */

    MuiTableBody: {
      styleOverrides: {
        root: {
          // Zebra effect
          '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: '#F0F2F5',
          },
          // Hover effect on all rows
          '& .MuiTableRow-root:hover': {
            backgroundColor: '#EAF3FF',
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#fff',
          overflow: 'hidden',
          marginTop: '1rem',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#dddbdb',
          '& .MuiTableCell-root': {
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#1e1e1e',
            borderBottom: '2px solid #ddd',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#333',
          borderBottom: '1px solid #e0e0e0',
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
  },
});

export default eyecandyTheme;
