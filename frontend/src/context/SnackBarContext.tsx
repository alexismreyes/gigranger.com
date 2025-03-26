import { createContext, useState } from 'react';
import { SnackStatus } from '../interfaces/interfaces';

//1 - Define the context type structure
interface SnackBarContextType {
  snackStatus: SnackStatus;
  setSnackStatus: (status: SnackStatus) => void;
  handleCloseSnack: () => void;
}

//2 - Create the context
export const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
);

//3 - Create the context provider
export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackStatus, setSnackStatus] = useState<SnackStatus>({
    open: false,
    action: '',
  });

  const handleCloseSnack = () => {
    setSnackStatus({ open: false, action: '' });
  };

  return (
    <SnackBarContext.Provider
      value={{ snackStatus, setSnackStatus, handleCloseSnack }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};
