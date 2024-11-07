import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';

const monsterDeathNotification = (socket, sequence, payload) => {
  const gameSession = getGameBySocket(socket);
  gameSession.users
    .filter((enemyUser) => enemyUser.socket !== socket) // 다른 사용자 필터링
    .forEach((enemyUser) => {
      const enemyMonsterDeathNotification = createResponse(
        PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION,
        sequence,
        {
          ...payload,
        },
      );
      console.log(enemyMonsterDeathNotification);
      enemyUser.socket.write(enemyMonsterDeathNotification); // 다른 사용자의 소켓에 알림 전송
    });
};

export default monsterDeathNotification;
