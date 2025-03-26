import { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

const useLoadingContext = () => {
  const loagindContext = useContext(LoadingContext);

  if (!loagindContext) {
    throw new Error('useLoadingContext must be used within a Provider');
  }
  return loagindContext;
};

export default useLoadingContext;
