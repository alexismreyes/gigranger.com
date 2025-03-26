import { createContext, useEffect, useState } from 'react';

//create and export the context
export const LoadingContext = createContext({
  isLoading: false,
  setLoading: (val: boolean) => {},
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
