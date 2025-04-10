import * as Yup from 'yup';

export const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  website: Yup.string().url(
    'Invalid website URL - must use http:// or https:// prepend to the website url. Example: https://www.website.com'
  ),
  foundationDate: Yup.string().required('Foundation date is required'),
  employeesAvgNumber: Yup.number()
    .typeError('Must be a number')
    .required('Number of employees is required'),
});
