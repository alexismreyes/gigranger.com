import React, { useEffect, useRef, useState } from 'react';
import socket from '../sockets/socket';
import { useChatNotificationContext } from '../context/ChatNotificationContext';
import { Button, Typography } from '@mui/material';
import { useChatManagement } from '../hooks/useChatManagement';
import { Message } from '../interfaces/interfaces';
import { useTranslation } from 'react-i18next';

interface ChatBoxProps {
  currentUserId: number;
  roomId: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentUserId, roomId }) => {
  const [newMsg, setNewMsg] = useState('');
  const { clearUnreadRoom } = useChatNotificationContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const { t } = useTranslation();

  const {
    userMap,
    getUsersInRoom,
    messages,
    getMessagesInRoom,
    handleNewMessage,
    markMessagesAsRead,
  } = useChatManagement();

  useEffect(() => {
    clearUnreadRoom(roomId);
    socket.emit('joinRoom', roomId);

    const fetchUserMap = async () => {
      try {
        await getUsersInRoom(roomId);
      } catch (error) {
        console.error('Failed to fetch users in room', error);
      }
    };

    const fetchMessages = async () => {
      try {
        await getMessagesInRoom(roomId);
      } catch (error) {
        console.error('Failed to fetch messages in room', error);
      }
    };

    fetchUserMap();
    fetchMessages();
    markMessagesAsRead(roomId); //added to mark messages as read

    const listener = (msg: Message) => {
      handleNewMessage(msg, roomId); // ⬅️ roomId passed explicitly
    };

    socket.on('messageReceived', listener);

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('messageReceived', listener);
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (userMap && currentUserId) {
      const id = Object.keys(userMap)
        .map(Number)
        .find((id) => id !== currentUserId);
      setReceiverId(id ?? null);
    }
  }, [userMap, currentUserId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    if (!receiverId) {
      console.warn('❌ Cannot send message — receiverId is missing');
      return;
    }

    socket.emit('sendMessage', {
      roomId,
      senderId: currentUserId,
      receiverId,
      message: newMsg,
    });

    setNewMsg('');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 8 }}>
      <Typography variant="h6" gutterBottom style={{ marginBottom: 4 }}>
        💬 {t('chat-live')}
      </Typography>

      <div
        style={{
          border: '1px solid #ccc',
          height: 200,
          overflowY: 'auto',
          padding: 8,
          marginBottom: 8,
          borderRadius: 4,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            <strong>
              {msg.senderId === currentUserId
                ? 'You'
                : userMap?.[msg.senderId] || `User ${msg.senderId}`}
              :
            </strong>{' '}
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '8px 12px',
            height: 40,
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
          placeholder={t('chat-type-message')}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          style={{
            height: 40,
            minWidth: 80,
            textTransform: 'none',
          }}
        >
          {t('send')}
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
