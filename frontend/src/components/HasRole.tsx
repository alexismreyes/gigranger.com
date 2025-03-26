import useAuthContext from '../hooks/useAuthContext';

interface HasRoleProps {
  role: number | number[];
  children: React.ReactNode;
}

const HasRole: React.FC<HasRoleProps> = ({ role, children }) => {
  const { user } = useAuthContext();

  if (!user) return null;

  const rolesArray = Array.isArray(role) ? role : [role];
  const hasAccess = rolesArray.includes(user.roleId);

  return hasAccess ? <>{children}</> : null;
};

export default HasRole;
