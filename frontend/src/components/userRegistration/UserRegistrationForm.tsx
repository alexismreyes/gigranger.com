import { Formik, Form, FormikHelpers } from 'formik';
import { Role, User } from '../../interfaces/interfaces';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getUserSchema } from '../../validations/yupLocaleHelper';

interface UserRegistrationFormProps {
  onSave: (user: User) => void;
  initialValues: User;
  onClose: () => void;
  roles: Role[];
}

type UserFormValues = User & { confirmPassword: string }; //this is done for type match because confirmPassword is not part of the interface User

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSave,
  initialValues,
  onClose,
  roles,
}) => {
  const { t } = useTranslation();
  const validationSchema = getUserSchema(t);

  const handleSubmit = async (
    values: UserFormValues,
    actions: FormikHelpers<UserFormValues>
  ) => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        roleId: values.roleId,
        email: values.email,
        password: values.password,
      };
      await onSave(userData);
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues, confirmPassword: '' }}
      //validationSchema={UserSchema}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form>
          <Box
            sx={{
              width: '90%',
              maxWidth: '600px', // limit width for a more readable form
              margin: '0 auto', // center the form container within its parent
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label={t('users-first-name')}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              label={t('users-last-name')}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <Select
              name="roleId"
              fullWidth
              value={values.roleId}
              onChange={handleChange}
              displayEmpty
              error={touched.roleId && Boolean(errors.roleId)}
              renderValue={(selected) =>
                selected
                  ? roles.find((role) => role.id === Number(selected))?.name
                  : t('users-select-role')
              }
            >
              <MenuItem value="" disabled>
                {t('users-select-role')}
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name} - &nbsp;
                  <span style={{ color: 'orange' }}>
                    {/* admin role excluded in the backend query */}
                    {role.id === 2 ? t('job-seeker') : t('recruiter')}
                  </span>
                </MenuItem>
              ))}
            </Select>
            {touched.roleId && errors.roleId && (
              <div style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.roleId}
              </div>
            )}

            <TextField
              label={t('email')}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label={t('password')}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              label={t('users-update-confirm-password')}
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <Box
              sx={{
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
                sx={{ width: '50%' }}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ width: '50%' }}
              >
                {isSubmitting ? t('sending') : t('send')}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationForm;
