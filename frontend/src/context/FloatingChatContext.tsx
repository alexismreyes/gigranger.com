import { createContext, useContext, useState } from 'react';

interface FloatingChatContextType {
  activeRoomId: number | null;
  setActiveRoomId: (roomId: number | null) => void;
}

const FloatingChatContext = createContext<FloatingChatContextType>({
  activeRoomId: null,
  setActiveRoomId: () => {},
});

export const FloatingChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);

  return (
    <FloatingChatContext.Provider value={{ activeRoomId, setActiveRoomId }}>
      {children}
    </FloatingChatContext.Provider>
  );
};

//hook to consume the context (intentionally using another approach not the one used for the other context)
export const useFloatingChatContext = () => useContext(FloatingChatContext);
