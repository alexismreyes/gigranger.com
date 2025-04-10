import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

const socket = io(SOCKET_URL, {
  withCredentials: true,
});

// expose a function to register the user ID:
export const registerUser = (userId: number) => {
  socket.emit('registerUser', userId);
};

export default socket;
