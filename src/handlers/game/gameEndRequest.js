import { exitGameSession, getGameBySocket } from '../../sessions/game_session.js';

const gameEndRequest = (socket) => {
  const gameSession = getGameBySocket(socket);
  if (gameSession) {
    exitGameSession(socket);
  }
};

export default gameEndRequest;
