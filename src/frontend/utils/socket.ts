import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = (): Socket => {
  socket = io('ws://localhost:3001/analyze/video_feed'); // Substitua 'URL_DO_SEU_BACKEND' pela URL real do seu servidor Socket.IO

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket.io não inicializado.');
  }

  return socket;
};
