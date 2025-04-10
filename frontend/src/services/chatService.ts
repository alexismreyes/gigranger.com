import { Chat } from '../interfaces/interfaces';
import api from './api';

const chatEndpoint = '/chat';

export const startChat = async (newChat: Chat) => {
  try {
    const response = await api.post(`${chatEndpoint}/start`, newChat);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const chatUsersInfo = async (roomIds: number[]) => {
  try {
    const response = await api.post(`${chatEndpoint}/room-usernames`, roomIds);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const getUsersInRoom = async (roomId: number) => {
  try {
    const response = await api.get(`${chatEndpoint}/room-users/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const getMessagesInRoom = async (roomId: number) => {
  try {
    const response = await api.get(`${chatEndpoint}/messages/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const getUnreadMessages = async () => {
  try {
    const response = await api.get(`${chatEndpoint}/unread-messages`);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};

export const markMessagesAsRead = async (roomId: number) => {
  try {
    const response = await api.get(`${chatEndpoint}/mark-as-read/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Something went wrong within the service->', error);
    throw error;
  }
};
