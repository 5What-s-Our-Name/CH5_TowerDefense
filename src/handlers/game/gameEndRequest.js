import { getGameBySocket } from '../../sessions/game_session.js';

const gameEndRequest = (socket) => {
  const gameSession = getGameBySocket(socket);
  if (gameSession) {
    gameSession.gameEndNotification();
  }
};

export default gameEndRequest;
