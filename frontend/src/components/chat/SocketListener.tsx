import { useEffect } from 'react';
import { Message } from '../../interfaces/interfaces';
import { useChatNotificationContext } from '../../context/ChatNotificationContext';
import socket from '../../sockets/socket';
import { useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

// Listen to messages
// 🧠 Global listener to catch messages when NOT inside ChatBox
// This ensures the Layout — which is always rendered and includes this component— listens to incoming messages regardless of current page.
const SocketListener = () => {
  const { addUnreadRoom } = useChatNotificationContext();
  const location = useLocation(); // ✅ Reactively track route
  const { user } = useAuthContext();

  //console.log('✅ SocketListener loaded - User ID:', user?.id);

  useEffect(() => {
    const handleMessageReceived = (msg: Message) => {
      console.log('📨 messageReceived triggered in SocketListener'); // ⬅️ must show
      console.log('📍 location.pathname:', location.pathname);
      console.log('📍 expected match:', `/chat/${msg.roomId}`);

      if (msg.senderId === user?.id) return; // ✅ don't notify sender

      // Check if user is not inside the chat room

      //const isInChatRoom = location.pathname === `/chat/${msg.roomId}`;
      const isInChatRoom =
        location.pathname.startsWith(`/chat/`) &&
        location.pathname.includes(`${msg.roomId}`);

      if (!isInChatRoom) {
        addUnreadRoom(msg.roomId); // Trigger badge update
        console.log('🔴 New message in another room:', msg.roomId);
      } /* else {
        alert('no addUnreadRoom executed');
      } */
    };

    socket.on('messageReceived', handleMessageReceived);

    return () => {
      socket.off('messageReceived', handleMessageReceived);
    };
  }, [location, user?.id]);

  return <></>;
};

export default SocketListener;
