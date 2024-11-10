import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  socket.setNoDelay(true); // Nagle 알고리즘 비활성화
  socket.buffer = Buffer.alloc(0);
  socket.C2SSequence = 0;
  socket.S2CSequence = 0;
  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};
