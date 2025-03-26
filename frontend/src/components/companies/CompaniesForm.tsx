import { Formik, Form, FormikHelpers } from 'formik';
import { Company } from '../../interfaces/interfaces';
import { CompanySchema } from '../../validations/companySchema';
import { Box, Button, TextField } from '@mui/material';

interface CompanyFormProps {
  initialValues: Company;
  onSave: (company: Company) => void;
  onClose: () => void;
}

const CompaniesForm: React.FC<CompanyFormProps> = ({
  initialValues,
  onSave,
  onClose,
}) => {
  const handleSubmit = async (
    values: Company,
    actions: FormikHelpers<Company>
  ) => {
    try {
      await onSave(values);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CompanySchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      enableReinitialize={true} //allows to edit
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
              label="Company name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              label="Website"
              name="website"
              value={values.website}
              onChange={handleChange}
              error={touched.website && Boolean(errors.website)}
              helperText={touched.website && errors.website}
            />
            <TextField
              label="foundation date"
              name="foundationDate"
              type="date"
              value={values.foundationDate}
              onChange={handleChange}
              error={touched.foundationDate && Boolean(errors.foundationDate)}
              helperText={touched.foundationDate && errors.foundationDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Employees Number"
              name="employeesAvgNumber"
              type="number"
              value={values.employeesAvgNumber}
              onChange={handleChange}
              error={
                touched.employeesAvgNumber && Boolean(errors.employeesAvgNumber)
              }
              helperText={
                touched.employeesAvgNumber && errors.employeesAvgNumber
              }
            />

            {/* <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  checked={values.active}
                  onChange={(e) => setFieldValue('active', e.target.checked)}
                />
              }
              label="Is Active?"
            /> */}

            {/* <TextField
              label="logo url"
              name="logoUrl"
              value={values.logoUrl}
              onChange={handleChange}
              error={touched.logoUrl && Boolean(errors.logoUrl)}
              helperText={touched.logoUrl && errors.logoUrl}
            /> */}

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
                {' '}
                Cancel{' '}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ width: '50%' }}
              >
                {isSubmitting ? 'Submiting...' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CompaniesForm;
