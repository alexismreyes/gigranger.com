import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useRolesManagement } from '../hooks/useRolesManagement';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const openDrawerWidth = 150;
  const collapsedDrawerWidth = 0;
  const { user } = useAuthContext();
  const { roles } = useRolesManagement();

  const drawer = (
    <List>
      <ListItemButton onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/companies')}>
        <ListItemText primary="Companies" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/jobcategories')}>
        <ListItemText primary="Job Categories" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/jobs')}>
        <ListItemText primary="Jobs" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/jobapplications')}>
        <ListItemText primary="Job Applications" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/users')}>
        <ListItemText primary="Users" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/logout')}>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {' '}
      {/* display flex to allow children to align properly when drawer closes or opens */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: drawerOpen
              ? `calc(100% - ${openDrawerWidth}px)`
              : `calc(100% - ${collapsedDrawerWidth}px)`,
          },
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="drawer-toggle-btn"
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h4">The Job Finding App</Typography>
          </Box>

          {/* Right Side: User Info */}

          {user && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 1 }}
            >
              <IconButton onClick={() => navigate('/users')}>
                <AccountCircleIcon
                  sx={{ fontSize: 35 }}
                  style={{ marginRight: '0.5rem' }}
                />
                <Typography variant="body1">
                  {user.firstName} {user.lastName} /{' '}
                  {roles.find((rol) => rol.id === user.roleId)?.name}
                </Typography>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer variant="persistent" open={drawerOpen}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          marginTop: '64px',
          padding: '16px',
          ml: {
            sm: drawerOpen
              ? `${openDrawerWidth + 40}px` //30 is an additional spacing between the drawer and the main content
              : `${collapsedDrawerWidth}px`,
          },
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
