import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';

const monsterDeathNotification = (socket, sequence, payload) => {
  const gameSession = getGameBySocket(socket);
  const { monsterId } = payload;
  const { user, opponent } = gameSession.getUsers(socket);

  user.getMonsterSearchAndReward(monsterId);
  user.removeMonster(monsterId);

  opponent.socket.write(
    createResponse(PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION, opponent.getNextSequence(), {
      monsterId,
    }),
  );
};

export default monsterDeathNotification;
