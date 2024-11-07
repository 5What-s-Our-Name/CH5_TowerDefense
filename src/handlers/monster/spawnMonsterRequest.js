import { getGameBySocket } from '../../sessions/game_session.js';
import { uuid } from '../../utils/util/uuid.js';
const spawnMonsterRequest = (socket, sequence, payload) => {
  const monsterId = uuid();
  const monsterNumber = Math.floor(Math.random() * 5) + 1;
  const monster = {
    monsterId,
    monsterNumber,
  };
  const game = getGameBySocket(socket);
  game.makeMonster(monster, socket);
};
export default spawnMonsterRequest;
