import { PACKET_TYPE } from '../../constants/header.js';
import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getOpponentUserBySocket, getUserBySocket } from '../../sessions/user_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const monsterAttackBaseRequest = (socket, damage) => {
  const user = getUserBySocket(socket);
  const otherUser = getOpponentUserBySocket(socket);
  if (!user || !otherUser) {
    console.error(`User with socket ${socket} not found`);
    return;
  }
  const game = getGameSession(user.userId);
  if (!game) {
    console.error(`Game session not found for user ID: ${user.userId}`);
    return;
  }
  const currentHp = game.setBaseHit(user, damage);

  const currentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    user.getNextSequence(),
    {
      isOpponent: false,
      baseHp: currentHp,
    },
  );
  console.log('userCurrentHpResponse: ', currentHpResponse);
  user.socket.write(currentHpResponse);
  const otherUserCurrentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    otherUser.getNextSequence(),
    {
      isOpponent: true,
      baseHp: currentHp,
    },
  );
  console.log('otherUserCurrentHpResponse :', otherUserCurrentHpResponse);
  otherUser.socket.write(otherUserCurrentHpResponse);

  console.log(`damage: ${damage}, currentHp: ${currentHp}`);
};

export default monsterAttackBaseRequest;
