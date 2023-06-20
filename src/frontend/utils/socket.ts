import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = (): Socket => {
<<<<<<< Updated upstream
  socket = io('ws://10.128.64.51:3001/analyze/video_feed'); // Substitua 'URL_DO_SEU_BACKEND' pela URL real do seu servidor Socket.IO
=======
  socket = io('ws://localhost:3001/analyze/video_feed'); // Substitua 'URL_DO_SEU_BACKEND' pela URL real do seu servidor Socket.IO
>>>>>>> Stashed changes

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket.io não inicializado.');
  }

  return socket;
};
