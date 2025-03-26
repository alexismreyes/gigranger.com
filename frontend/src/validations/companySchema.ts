import * as Yup from 'yup';

export const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  website: Yup.string().url('Invalid website URL'),
  foundationDate: Yup.string().required('Foundation date is required'),
  employeesAvgNumber: Yup.number()
    .typeError('Must be a number')
    .required('Number of employees is required'),
  /* active: Yup.boolean().required('active or not, is required'),
  logoUrl: Yup.string().url('Invalid logo URL').nullable(), */
});
