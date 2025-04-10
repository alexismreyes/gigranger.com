import { useEffect } from 'react';
import { Message } from '../../interfaces/interfaces';
import { useChatNotificationContext } from '../../context/ChatNotificationContext';
import socket from '../../sockets/socket';
import useAuthContext from '../../hooks/useAuthContext';
import { useFloatingChatContext } from '../../context/FloatingChatContext';

// Listen to messages
// 🧠 Global listener to catch messages when NOT inside ChatBox
// This ensures the Layout — which is always rendered and includes this component— listens to incoming messages regardless of current page.
const SocketListener = () => {
  const { addUnreadRoom } = useChatNotificationContext();
  const { user } = useAuthContext();
  const { activeRoomId } = useFloatingChatContext();

  useEffect(() => {
    const handleNotify = (msg: Message) => {
      if (msg.senderId === user?.id) return;

      const isInActiveRoom = msg.roomId === activeRoomId;

      if (!isInActiveRoom) {
        addUnreadRoom(msg.roomId);
        console.log('🔴 [notify] Badge added for room', msg.roomId);
      } else {
        console.log(
          '✅ [notify] Skipped badge — user is already in room',
          msg.roomId
        );
      }
    };

    socket.on('notify', handleNotify);

    return () => {
      socket.off('notify', handleNotify);
    };
  }, [activeRoomId, user?.id]);

  return <></>;
};

export default SocketListener;
