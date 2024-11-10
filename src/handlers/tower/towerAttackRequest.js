import { getGameBySocket } from '../../sessions/game_session.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleErr } from '../../utils/error/handlerErr.js';
const towerAttackRequest = (socket, sequence, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { opponent } = gameSession.getUsers(socket);
    const { towerId, monsterId } = payload;

    opponent.socket.write(
      createResponse(PACKET_TYPE.ENEMY_TOWER_ATTACK_NOTIFICATION, opponent.getNextSequence(), {
        towerId,
        monsterId,
      }),
    );
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default towerAttackRequest;
