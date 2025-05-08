import { createContext, useState } from 'react';

type LoadingMap = Record<string, boolean>;

type LoadingContextType = {
  loadingMap: LoadingMap;
  setFeatureLoading: (key: string, value: boolean) => void;
};

//create and export the context
export const LoadingContext = createContext<LoadingContextType>({
  loadingMap: {},
  setFeatureLoading: () => {},
});

//create and export the provider
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});

  const setFeatureLoading = (key: string, value: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <LoadingContext.Provider value={{ loadingMap, setFeatureLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
