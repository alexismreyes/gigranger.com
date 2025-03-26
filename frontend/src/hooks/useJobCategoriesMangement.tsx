import { useEffect, useState } from 'react';
import {
  fetchJobCategories as fetchJobCategoriesAPI,
  createJobCategory as createJobCategoryAPI,
  updateJobCategory as updateJobCategoryAPI,
  deleteJobCategory as deleteJobCategoryAPI,
} from '../services/JobCategoriesService';
import { JobCategory } from '../interfaces/interfaces';
import useSnackBarContext from './useSnackBarContext';

export const useJobCategoriesManagement = () => {
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const { setSnackStatus } = useSnackBarContext();

  useEffect(() => {
    fetchJobCategories();
  }, []);

  const fetchJobCategories = async () => {
    try {
      const data = await fetchJobCategoriesAPI();
      setJobCategories(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const createJobCategory = async (jobCategory: JobCategory) => {
    try {
      const newJobCategory = await createJobCategoryAPI(jobCategory);
      setJobCategories((prev) => [...prev, newJobCategory]);
      setSnackStatus({
        open: true,
        action: 'created',
        source: 'JobCategoriesList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const updateJobCategory = async (jobCategory: JobCategory) => {
    try {
      const updatedJobCategory = await updateJobCategoryAPI(jobCategory);
      setJobCategories((prev) =>
        prev.map((cat) =>
          cat.id === updatedJobCategory.id ? updatedJobCategory : cat
        )
      );
      setSnackStatus({
        open: true,
        action: 'updated',
        source: 'JobCategoriesList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const deleteJobCategory = async (jobCategoryId: number) => {
    try {
      await deleteJobCategoryAPI(jobCategoryId);
      setJobCategories((prev) =>
        prev.filter((cat) => cat.id !== jobCategoryId)
      );
      setSnackStatus({
        open: true,
        action: 'deleted',
        source: 'JobCategoriesList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  return {
    jobCategories,
    createJobCategory,
    updateJobCategory,
    deleteJobCategory,
  };
};
