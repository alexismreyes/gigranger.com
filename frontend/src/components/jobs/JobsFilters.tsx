import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  Company,
  JobCategory,
  JobFilterState,
} from '../../interfaces/interfaces';
import { useTranslation } from 'react-i18next';

interface JobsFiltersProps {
  jobCategories: JobCategory[];
  companies: Company[];
  filters: JobFilterState;
  onFilterChange: (filters: Partial<JobFilterState>) => void;
}

const JobsFilters: React.FC<JobsFiltersProps> = ({
  jobCategories,
  companies,
  filters,
  onFilterChange,
}) => {
  const handleChange = (key: keyof JobFilterState, value: string) => {
    onFilterChange({ [key]: value });
  };

  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          {/* Search Input */}

          <Grid item xs={12}>
            <TextField
              label={t('filters_search')}
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>{t('category')}</InputLabel>
              <Select
                value={filters.selectedCategory}
                onChange={(e: SelectChangeEvent) =>
                  handleChange('selectedCategory', e.target.value)
                }
                label="Category"
              >
                <MenuItem value="">{t('filters_all_categories')}</MenuItem>
                {jobCategories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>{t('company')}</InputLabel>
              <Select
                value={filters.selectedCompany}
                onChange={(e: SelectChangeEvent) =>
                  handleChange('selectedCompany', e.target.value)
                }
                label="Company"
              >
                <MenuItem value="">{t('filters_all_companies')}</MenuItem>
                {companies.map((com) => (
                  <MenuItem key={com.id} value={com.id}>
                    {com.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={2}>
            <TextField
              label={t('filters_min_salary')}
              type="number"
              value={filters.minSalary}
              onChange={(e) => handleChange('minSalary', e.target.value)}
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label={t('filters_max_salary')}
              type="number"
              value={filters.maxSalary}
              onChange={(e) => handleChange('maxSalary', e.target.value)}
              fullWidth
              margin="dense"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default JobsFilters;
