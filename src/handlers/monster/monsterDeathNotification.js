import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { handleErr } from '../../utils/error/handlerErr.js';

const monsterDeathNotification = (socket, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { monsterId } = payload;
    const { user, opponent } = gameSession.getUsers(socket);

    opponent.socket.write(
      createResponse(PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION, opponent.getNextSequence(), {
        monsterId,
      }),
    );
    user.removeMonster(monsterId);
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default monsterDeathNotification;
