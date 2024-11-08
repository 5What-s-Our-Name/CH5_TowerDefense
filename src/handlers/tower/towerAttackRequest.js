import { getGameBySocket } from '../../sessions/game_session.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createResponse.js';

const towerAttackRequest = (socket, sequence, payload) => {
  const gameSession = getGameBySocket(socket);
  const { user, opponent } = gameSession.getUsers(socket);
  const { towerId, monsterId } = payload;

  opponent.socket.write(
    createResponse(PACKET_TYPE.ENEMY_TOWER_ATTACK_NOTIFICATION, opponent.getNextSequence(), {
      towerId,
      monsterId,
    }),
  );
};

export default towerAttackRequest;
