import { exitGameSession, getGameBySocket } from '../../sessions/game_session.js';
import { saveHighScore } from '../../utils/game/score.js';
import { delay } from '../../utils/util/delay.js';

const gameEndRequest = (socket) => {
  const gameSession = getGameBySocket(socket);
  const user = gameSession.getUser(socket);
  saveHighScore(user.userId, user.score);
  if (gameSession) {
    delay(3000);
    exitGameSession(socket);
  }
};

export default gameEndRequest;
