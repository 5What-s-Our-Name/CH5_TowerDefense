import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { delay } from '../../utils/util/delay.js';
import { handleErr } from '../../utils/error/handlerErr.js';

const monsterDeathNotification = (socket, sequence, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { monsterId } = payload;
    const { user, opponent } = gameSession.getUsers(socket);

    user.removeMonster(monsterId);

    opponent.socket.write(
      createResponse(PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION, opponent.getNextSequence(), {
        monsterId,
      }),
    );
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default monsterDeathNotification;
