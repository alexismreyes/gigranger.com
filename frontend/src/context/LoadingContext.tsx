import { createContext, useState } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
};

//create and export the context
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
});

//create and export the provider
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (val: boolean): void => {
    setIsLoading(val);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
