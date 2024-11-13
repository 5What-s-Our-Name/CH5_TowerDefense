import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const spawnMonsterRequest = (socket) => {
  const gameSession = getGameBySocket(socket);

  const { user, opponent } = gameSession.getUsers(socket);

  const monster = user.addMonster();

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
};

export default spawnMonsterRequest;
