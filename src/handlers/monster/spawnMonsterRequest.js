import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { uuid } from '../../utils/util/uuid.js';
const spawnMonsterRequest = (socket, sequence, payload) => {
  const monsterId = uuid();
  const monsterNumber = Math.floor(Math.random() * 5) + 1;
  const monster = {
    monsterId,
    monsterNumber,
  };
  const game = getGameBySocket(socket);
  const { user, opponent } = game.getUsers(socket);
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
