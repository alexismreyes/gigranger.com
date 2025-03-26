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
  let userList = [];
  userList =
    user?.roleId === 1 ? users : users.filter((u) => u.id === user?.id);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <HasRole role={2}>
              <TableCell>Resume</TableCell>
            </HasRole>
            <TableCell>Actions</TableCell>
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
                          View Resume
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
