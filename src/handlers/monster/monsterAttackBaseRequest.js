import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getUserBySocket } from '../../sessions/user_session.js';

const monsterAttackBaseRequest = (socket, damage) => {
  const user = getUserBySocket(socket);
  const game = getGameSession(user.userId);
  game.setBaseHit();
};

export default monsterAttackBaseRequest;
