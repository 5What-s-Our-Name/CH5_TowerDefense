import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';
import { v4 as uuidV4 } from 'uuid';

export const onConnection = (socket) => {
  // socket.setNoDelay(true); // Nagle 알고리즘 비활성화
  socket.buffer = Buffer.alloc(0);
  socket.clientId = uuidV4();
  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};
