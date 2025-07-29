import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Role, User } from '../../interfaces/interfaces';
import { Delete, Edit } from '@mui/icons-material';
import HasRole from '../HasRole';
import { useTranslation } from 'react-i18next';

interface UsersTableProps {
  users: User[];
  roles: Role[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  user: User | null;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  roles,
  onEdit,
  onDelete,
  user,
}) => {
  const { t } = useTranslation();

  let userList = [];
  userList =
    user?.roleId === 1 ? users : users.filter((u) => u.id === user?.id);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('users-first-name')}</TableCell>
            <TableCell>{t('users-last-name')}</TableCell>
            <TableCell>{t('email')}</TableCell>
            <TableCell>{t('users-role')}</TableCell>
            <HasRole role={2}>
              <TableCell>Resume</TableCell>
            </HasRole>
            <TableCell>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((u) => {
            const roleName =
              roles.find((role) => u.roleId === role.id)?.name || 'Unknown';
            return (
              <TableRow key={u.id}>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{roleName}</TableCell>
                <HasRole role={2}>
                  <TableCell>
                    {u.resumeUrl && (
                      <a
                        href={u.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="outlined" size="small">
                          {t('users-view-resume')}
                        </Button>
                      </a>
                    )}
                  </TableCell>
                </HasRole>
                <TableCell>
                  {' '}
                  <IconButton color="primary" onClick={() => onEdit(u)}>
                    <Edit />
                  </IconButton>
                  <HasRole role={1}>
                    <IconButton
                      color="error"
                      onClick={() => u.id !== undefined && onDelete(u.id)}
                    >
                      <Delete />
                    </IconButton>
                  </HasRole>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
