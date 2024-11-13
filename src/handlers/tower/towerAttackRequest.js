import { getGameBySocket } from '../../sessions/game_session.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import CustomErr from '../../utils/error/customErr.js';
const towerAttackRequest = (socket, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { user, opponent } = gameSession.getUsers(socket);

    const { towerId, monsterId } = payload;

    // if (!user.getTowerSearch(towerId))
    //   throw CustomErr(PACKET_TYPE.TOWER_ATTACK_REQUEST, '유저가 보유하지 않은 타워 입니다.');

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
