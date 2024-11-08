import { getGameBySocket } from '../../sessions/game_session.js';

const gameEndRequest = (socket) => {
  const gameSession = getGameBySocket(socket);
  if (gameSession) {
    gameSession.gameEndNotification();
    gameSession.removeUser(socket);
  }
};

export default gameEndRequest;
