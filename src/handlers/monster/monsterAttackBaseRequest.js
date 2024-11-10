import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createResponse } from '../../utils/response/createResponse.js';

const monsterAttackBaseRequest = (socket, _, payload) => {
  try {
    const { damage } = payload;
    const gameSession = getGameBySocket(socket);

    const { user, opponent } = gameSession.getUsers(socket);

    user.removeMonster();

    const baseHp = user.setBaseHit(damage);
    const isGameOver = baseHp <= 0;

    const packetType = isGameOver
      ? PACKET_TYPE.GAME_OVER_NOTIFICATION
      : PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION;

    const userPayload = isGameOver ? { isWin: !isGameOver } : { isOpponent: false, baseHp };
    const opponentPayload = isGameOver ? { isWin: isGameOver } : { isOpponent: true, baseHp };

    user.socket.write(createResponse(packetType, user.getNextSequence(), userPayload));

    opponent.socket.write(createResponse(packetType, opponent.getNextSequence(), opponentPayload));
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default monsterAttackBaseRequest;
