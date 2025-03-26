import { useContext } from 'react';
import { MyOwnContext } from '../context/MyOwnContext';

const useMyOwnContext = () => {
  const myOwnContext = useContext(MyOwnContext);

  if (!myOwnContext) {
    throw new Error(
      'useMyOwnContext must be used within a MyOwnContextProvider'
    );
  }
  return myOwnContext;
};

export default useMyOwnContext;
