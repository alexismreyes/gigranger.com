import { createContext, useContext, useEffect, useState } from 'react';
import { useChatManagement } from '../hooks/useChatManagement';
import { UnreadMessages } from '../interfaces/interfaces';
import useAuthContext from '../hooks/useAuthContext';

interface ChatNotificationType {
  unreadMessages: Record<number, number>;
  addUnreadRoom: (roomId: number) => void;
  clearUnreadRoom: (roomId: number) => void;
}

const ChatNotificationContext = createContext<ChatNotificationType>({
  unreadMessages: {},
  addUnreadRoom: () => {},
  clearUnreadRoom: () => {},
});

export const ChatNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [unreadMessages, setUnreadMessages] = useState<Record<number, number>>(
    {}
  );

  const { getUnreadMessages } = useChatManagement();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.id) {
      fetchUnreadMessages();
    }
  }, [user?.id]);

  const fetchUnreadMessages = async () => {
    try {
      const data = await getUnreadMessages();

      const mapped: Record<number, number> = {};

      data.forEach((item: UnreadMessages) => {
        mapped[item.roomId] = item.count;
      });

      setUnreadMessages(mapped); // this will update the badge
    } catch (err) {
      console.error('Failed to load offline unread messages:', err);
    }
  };

  const addUnreadRoom = (roomId: number) => {
    setUnreadMessages((prev) => ({
      ...prev,
      [roomId]: prev[roomId] ? prev[roomId] + 1 : 1,
    }));
  };

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
        unreadMessages,
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
