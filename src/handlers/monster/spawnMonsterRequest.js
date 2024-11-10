import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProto.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import CustomErr from '../../utils/error/customErr.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createResponse } from '../../utils/response/createResponse.js';

const spawnMonsterRequest = (socket, sequence, payload) => {
  try {
    const gameSession = getGameBySocket(socket);

    if (!gameSession) {
      throw CustomErr(GlobalFailCode);
    }

    const { user, opponent } = gameSession.getUsers(socket);

    const { monsterId, monsterNumber } = user.addMonster();
    const monster = {
      monsterId,
      monsterNumber,
    };

    user.socket.write(
      createResponse(PACKET_TYPE.SPAWN_MONSTER_RESPONSE, user.getNextSequence(), monster),
    );

    opponent.socket.write(
      createResponse(
        PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION,
        opponent.getNextSequence(),
        monster,
      ),
    );
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default spawnMonsterRequest;
