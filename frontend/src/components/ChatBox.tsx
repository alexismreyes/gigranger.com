import React, { useEffect, useRef, useState } from 'react';
import socket from '../sockets/socket';
import { Message } from '../interfaces/interfaces';
import { useChatNotificationContext } from '../context/ChatNotificationContext';
import { Button, Typography } from '@mui/material';

interface ChatBoxProps {
  currentUserId: number;
  roomId: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentUserId, roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const { clearUnreadRoom } = useChatNotificationContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    clearUnreadRoom(roomId);
    socket.emit('joinRoom', roomId);

    const fetchUserMap = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/chat/room-users/${roomId}`
      );
      const data = await res.json();
      setUserMap(data);
    };

    const fetchMessages = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/chat/messages/${roomId}`
      );
      const msgs = await res.json();
      setMessages(msgs);
    };

    fetchUserMap();
    fetchMessages();

    const handleNewMessage = (msg: Message) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
        clearUnreadRoom(roomId);
      }
    };

    socket.on('messageReceived', handleNewMessage);
    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('messageReceived', handleNewMessage);
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const receiverId = Object.keys(userMap)
      .map((id) => parseInt(id))
      .find((id) => id !== currentUserId);

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
        💬 Live Chat
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
          placeholder="Type a message..."
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
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
