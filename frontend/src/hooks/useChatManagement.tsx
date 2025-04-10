import { useState } from 'react';
import {
  startChat as startChatAPI,
  chatUsersInfo as chatUsersInfoAPI,
  getUsersInRoom as getUsersInRoomAPI,
  getMessagesInRoom as getMessagesInRoomAPI,
  getUnreadMessages as getUnreadMessagesAPI,
  markMessagesAsRead as markMessagesAsReadAPI,
} from '../services/chatService';
import { Chat, Message, RoomDetails } from '../interfaces/interfaces';
import { useChatNotificationContext } from '../context/ChatNotificationContext';

export const useChatManagement = () => {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [roomDetails, setRoomDetails] = useState<RoomDetails[] | null>(null);
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const { clearUnreadRoom } = useChatNotificationContext();

  const startChat = async (newChat: Chat) => {
    try {
      const data = await startChatAPI(newChat);
      setRoomId(data.roomId);
      return data;
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const chatUsersInfo = async (roomIds: number[]) => {
    try {
      const data = await chatUsersInfoAPI(roomIds);
      setRoomDetails(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const getUsersInRoom = async (roomId: number) => {
    try {
      const data = await getUsersInRoomAPI(roomId);
      console.log('userMap->', data);
      console.log('✅ userMap set from getUsersInRoom:', data);

      setUserMap(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const getMessagesInRoom = async (roomId: number) => {
    try {
      const data = await getMessagesInRoomAPI(roomId);
      setMessages(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const getUnreadMessages = async () => {
    try {
      const data = await getUnreadMessagesAPI();
      return data;
    } catch (error) {
      console.error('Error within the hook->', error);
      return []; // ✅ this avoids undefined in context
    }
  };

  const markMessagesAsRead = async (roomId: number) => {
    try {
      const data = await markMessagesAsReadAPI(roomId);
      console.log('Message marked as read print this->', data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const handleNewMessage = (msg: Message, roomId: number) => {
    setMessages((prev) => [...prev, msg]);
    clearUnreadRoom(roomId);
  };

  return {
    roomId,
    startChat,
    chatUsersInfo,
    roomDetails,
    userMap,
    getUsersInRoom,
    messages,
    getMessagesInRoom,
    handleNewMessage,
    getUnreadMessages,
    markMessagesAsRead,
  };
};
