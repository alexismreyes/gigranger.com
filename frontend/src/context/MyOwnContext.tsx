import { createContext, useEffect, useState } from 'react';

//Create context type
interface MyOwnContextType {
  getTime: () => void;
}

//create and export the context
export const MyOwnContext = createContext<MyOwnContextType | undefined>(
  undefined
);

//create and export the provider
export const MyOwnProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const now = new Date();

  useEffect(() => {
    //console.log('currentime->', currentTime);
  }, [currentTime]);

  const getTime = (): void => {
    setCurrentTime(now.toLocaleTimeString());
  };

  return (
    <MyOwnContext.Provider value={{ getTime }}>
      {children}
    </MyOwnContext.Provider>
  );
};
