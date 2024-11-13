import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createResponse } from '../../utils/response/createResponse.js';

const monsterAttackBaseRequest = (socket, payload) => {
  try {
    const { damage } = payload;
    const gameSession = getGameBySocket(socket);

    const { user, opponent } = gameSession.getUsers(socket);

    const baseHp = user.setBaseHit(damage);
    const isGameOver = baseHp <= 0;
    user.removeMonster();

    const packetType = isGameOver
      ? PACKET_TYPE.GAME_OVER_NOTIFICATION
      : PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION;

    const userPayload = { isOpponent: false, baseHp, isWin: !isGameOver };
    const opponentPayload = { isOpponent: true, baseHp, isWin: isGameOver };

    user.socket.write(createResponse(packetType, user.getNextSequence(), userPayload));

    opponent.socket.write(createResponse(packetType, opponent.getNextSequence(), opponentPayload));
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default monsterAttackBaseRequest;
