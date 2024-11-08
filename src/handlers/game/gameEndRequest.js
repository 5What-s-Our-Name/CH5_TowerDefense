import { exitGameSession, getGameBySocket } from '../../sessions/game_session.js';
import { saveHighScore } from '../../utils/game/score.js';

const gameEndRequest = (socket) => {
  const gameSession = getGameBySocket(socket);
  const user = gameSession.getUser(socket);
  saveHighScore(user.userId, user.score);
  if (gameSession) {
    exitGameSession(socket);
  }
};

export default gameEndRequest;
