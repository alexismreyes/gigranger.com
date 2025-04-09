import { createContext, useContext, useState } from 'react';

interface ChatNotificationType {
  //unreadRoomIds: number[];
  unreadMessages: Record<number, number>; // roomId -> count
  addUnreadRoom: (roomId: number) => void;
  clearUnreadRoom: (roomId: number) => void;
}

const ChatNotificationContext = createContext<ChatNotificationType>({
  //  unreadRoomIds: [],
  unreadMessages: {},
  addUnreadRoom: () => {},
  clearUnreadRoom: () => {},
});

export const ChatNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const [unreadRoomIds, setUnreadRoomIds] = useState<number[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Record<number, number>>(
    {}
  );

  /* const addUnreadRoom = (roomId: number) => {
    setUnreadRoomIds((prev) =>
      prev.includes(roomId) ? prev : [...prev, roomId]
    );
    console.log('unreadRoomIds->', unreadRoomIds);
  }; */

  const addUnreadRoom = (roomId: number) => {
    setUnreadMessages((prev) => ({
      ...prev,
      [roomId]: prev[roomId] ? prev[roomId] + 1 : 1,
    }));
  };

  /* const clearUnreadRoom = (roomId: number) => {
    setUnreadRoomIds((prev) => prev.filter((id) => id != roomId));
  }; */

  const clearUnreadRoom = (roomId: number) => {
    setUnreadMessages((prev) => {
      const updated = { ...prev };
      delete updated[roomId];
      return updated;
    });
  };

  return (
    <ChatNotificationContext.Provider
      value={{
        /* unreadRoomIds */ unreadMessages,
        addUnreadRoom,
        clearUnreadRoom,
      }}
    >
      {children}
    </ChatNotificationContext.Provider>
  );
};

//hook to consume the context (intentionally using another approach not the one used for the other context)
export const useChatNotificationContext = () =>
  useContext(ChatNotificationContext);
