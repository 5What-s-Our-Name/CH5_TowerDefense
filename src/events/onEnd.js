import { getGameBySocket } from '../sessions/game_session.js';
import { getUserBySocket, removeUser } from '../sessions/user_session.js';

export const onEnd = (socket) => () => {
  // 소켓 종료 시 수행해야 할 함수 추가
  const gameSession = getGameBySocket(socket);
  if (gameSession) gameSession.removeUser(socket);
  removeUser(socket);
  console.log('Client Disconnected');
};
