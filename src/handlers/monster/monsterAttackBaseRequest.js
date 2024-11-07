import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const monsterAttackBaseRequest = (socket, sequence, payload) => {
  const { damage } = payload;
  const gameSession = getGameBySocket(socket);
  const { user, opponent } = gameSession.getUsers(socket);

  const baseHp = gameSession.setBaseHit(user, damage);

  const currentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    user.getNextSequence(),
    {
      isOpponent: false,
      baseHp,
    },
  );
  user.socket.write(currentHpResponse);
  const otherUserCurrentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    opponent.getNextSequence(),
    {
      isOpponent: true,
      baseHp,
    },
  );
  opponent.socket.write(otherUserCurrentHpResponse);
};

export default monsterAttackBaseRequest;
