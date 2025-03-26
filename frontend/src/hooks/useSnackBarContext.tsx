import { useContext } from 'react';
import { SnackBarContext } from '../context/SnackBarContext';

const useSnackBarContext = () => {
  const snackBarContext = useContext(SnackBarContext);

  if (!snackBarContext) {
    throw new Error(
      'useSnackBarContext must be used within a SnackBarProvider'
    );
  }
  return snackBarContext;
};

export default useSnackBarContext;
