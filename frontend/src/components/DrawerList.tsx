import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import HasRole from './HasRole';

export const DrawerList = () => {
  const [openDialogLogout, setOpenDialogLogout] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const SectionTitle = ({ label }: { label: string }) => (
    <Typography
      variant="caption"
      sx={{
        px: 2,
        mt: 2,
        color: '#fff',
        fontWeight: 'bold',
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </Typography>
  );

  const FancyDivider = () => (
    <Divider
      sx={{
        my: 1,
        mx: 2,
        borderBottomWidth: 2,
        background: 'linear-gradient(to right, #fff, #ffeb99)',
        borderRadius: 1,
      }}
    />
  );

  const drawer = (
    <List>
      <ListItemButton onClick={() => navigate('/')}>
        <ListItemIcon>
          <HomeIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-home')} />
      </ListItemButton>
      <FancyDivider />

      <ListItemButton onClick={() => navigate('/companies')}>
        <ListItemIcon>
          <BusinessIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-companies')} />
      </ListItemButton>
      <FancyDivider />
      <ListItemButton onClick={() => navigate('/jobcategories')}>
        <ListItemIcon>
          <CategoryIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-categories')} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/jobs')}>
        <ListItemIcon>
          <WorkIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-jobs')} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/jobapplications')}>
        <ListItemIcon>
          <AssignmentIndIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-applications')} />
      </ListItemButton>
      <HasRole role={[1, 2]}>
        <ListItemButton onClick={() => navigate('/jobmatching')}>
          <ListItemIcon>
            <PsychologyIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary={t('drawer-job-matcher')} />
        </ListItemButton>
      </HasRole>
      <FancyDivider />

      <ListItemButton onClick={() => navigate('/users')}>
        <ListItemIcon>
          <PeopleIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-users')} />
      </ListItemButton>
      <FancyDivider />

      <ListItemButton onClick={() => setOpenDialogLogout(true)}>
        <ListItemIcon>
          <LogoutIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText primary={t('drawer-logout')} />
      </ListItemButton>
    </List>
  );

  return { drawer, setOpenDialogLogout, openDialogLogout };
};
