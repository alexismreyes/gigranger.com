import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getUserSchema = (t: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string().required(t('validation.required')),
    lastName: Yup.string().required(t('validation.required')),
    roleId: Yup.number().required(t('validation.required')),
    email: Yup.string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.minPassword'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.passwordsMustMatch'))
      .required(t('validation.confirmPassword')),
  });

export const getCompanySchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t('validation.company.name')),
    address: Yup.string().required(t('validation.company.address')),
    description: Yup.string().required(t('validation.company.description')),
    email: Yup.string()
      .email(t('validation.company.invalidEmail'))
      .required(t('validation.company.email')),
    phone: Yup.string().required(t('validation.company.phone')),
    website: Yup.string().url(t('validation.company.website')),
    foundationDate: Yup.string().required(
      t('validation.company.foundationDate')
    ),
    employeesAvgNumber: Yup.number()
      .typeError(t('validation.company.mustBeNumber'))
      .required(t('validation.company.employees')),
  });
