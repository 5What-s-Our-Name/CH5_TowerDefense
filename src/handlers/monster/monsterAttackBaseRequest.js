import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getUserBySocket } from '../../sessions/user_session.js';
import { config } from '../../config/config.js';
import jwt from 'jsonwebtoken';

const monsterAttackBaseRequest = (socket, damage) => {
  const user = getUserBySocket(socket);

  const game = getGameSession(user.userId);
  if (!game) {
    console.error(`Game session not found for user ID: ${user.userId}`);
    return;
  }
  game.setBaseHit(socket, damage);
};

export default monsterAttackBaseRequest;
