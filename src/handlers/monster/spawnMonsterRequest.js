import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const spawnMonsterRequest = (socket) => {
  const gameSession = getGameBySocket(socket);

  const { user, opponent } = gameSession.getUsers(socket);

  if (!user || !opponent) {
    console.error('없음');
  }
  const monster = user.addMonster();

  try {
    user.socket.write(
      createResponse(PACKET_TYPE.SPAWN_MONSTER_RESPONSE, user.getNextSequence(), monster),
    );
  } catch (error) {
    console.log('나한테 발송하는 패킷 오류', error.message);
  }
  try {
    opponent.socket.write(
      createResponse(
        PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION,
        opponent.getNextSequence(),
        monster,
      ),
    );
  } catch (error) {
    console.log('적한테 발송하는 패킷 오류', error.message);
  }

  user.sync();
};

export default spawnMonsterRequest;
