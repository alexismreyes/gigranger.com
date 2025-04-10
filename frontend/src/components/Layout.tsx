import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useRolesManagement } from '../hooks/useRolesManagement';

import LogoutDialog from './LogoutDialog';
import { registerUser } from '../sockets/socket';
import { useChatNotificationContext } from '../context/ChatNotificationContext';
import SocketListener from './chat/SocketListener';
import UnreadChatListModal from './chat/UnreadChatListModal';
import FloatingChatWindow from './chat/FloatingChatWindow';
import { useFloatingChatContext } from '../context/FloatingChatContext';
import SnackBar from './SnackBar';
import useSnackBarContext from '../hooks/useSnackBarContext';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [openDialogLogout, setOpenDialogLogout] = useState<boolean>(false);

  const openDrawerWidth = 150;
  const collapsedDrawerWidth = 0;
  const { user } = useAuthContext();
  const { roles } = useRolesManagement();
  const { snackStatus, handleCloseSnack, setSnackStatus } =
    useSnackBarContext();
  const { unreadMessages } = useChatNotificationContext();
  const totalUnread = Object.values(unreadMessages).reduce(
    (sum, count) => sum + count,
    0
  );
  const unreadRoomIds = Object.keys(unreadMessages).map((id) =>
    parseInt(id, 10)
  );
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const { activeRoomId, setActiveRoomId } = useFloatingChatContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = (): void => {
    setOpenDialogLogout(false);
    navigate('/logout');
  };

  useEffect(() => {
    if (user?.id) {
      registerUser(user.id);
    }
  }, [user?.id]);

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

      <ListItemButton onClick={() => setOpenDialogLogout(true)}>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );

  return (
    <>
      <SocketListener />
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
          <Toolbar
            sx={{
              minHeight: 64,
              height: 64,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="drawer-toggle-btn"
              >
                {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant={isMobile ? 'body1' : 'h4'}>
                The Job Finding App
              </Typography>
            </Box>

            {/* Right Side: User Info */}

            {user && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 'auto',
                  gap: 1,
                }}
              >
                <Badge
                  color="error"
                  badgeContent={totalUnread}
                  showZero={false}
                  invisible={totalUnread === 0}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.75rem',
                      color: '#fff',
                      backgroundColor: '#f44336',
                      height: 20,
                      minWidth: 20,
                      padding: '0 6px',
                      borderRadius: '50%',
                    },
                  }}
                >
                  <ChatIcon
                    sx={{ cursor: 'pointer', fontSize: 28 }}
                    onClick={() => {
                      if (unreadRoomIds.length === 1) {
                        setActiveRoomId(unreadRoomIds[0]);
                      } else if (unreadRoomIds.length > 1) {
                        setChatModalOpen(true);
                      } else {
                        setSnackStatus({
                          open: true,
                          action: 'nonewchat',
                          source: 'Chat',
                          severity: 'warning',
                        });
                      }
                    }}
                  />
                </Badge>
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
          <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
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
                ? `${openDrawerWidth + 30}px`
                : `${collapsedDrawerWidth}px`,
            },
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          <Outlet />
        </Box>
        <LogoutDialog
          open={openDialogLogout}
          onClose={() => setOpenDialogLogout(false)}
          onConfirm={handleLogout}
        />
      </Box>
      <UnreadChatListModal
        open={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        unreadRooms={unreadRoomIds}
        onSelectRoom={(roomId) => {
          setChatModalOpen(false);
          setActiveRoomId(roomId);
        }}
      />
      {user && activeRoomId !== null && (
        <FloatingChatWindow
          open={!!activeRoomId}
          roomId={activeRoomId}
          currentUserId={user.id as number}
          onClose={() => setActiveRoomId(null)}
        />
      )}
      <SnackBar
        parentComponent="Chat"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
      ;
    </>
  );
};

export default Layout;
