import { useState } from 'react';
import {
  startChat as startChatAPI,
  chatUsersInfo as chatUsersInfoAPI,
  getUsersInRoom as getUsersInRoomAPI,
  getMessagesInRoom as getMessagesInRoomAPI,
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
      //console.log('roomdetails->', data);
      setRoomDetails(data);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const getUsersInRoom = async (roomId: number) => {
    try {
      const data = await getUsersInRoomAPI(roomId);
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
  };
};
