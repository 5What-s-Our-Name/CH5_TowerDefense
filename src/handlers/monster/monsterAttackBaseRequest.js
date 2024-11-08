import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const monsterAttackBaseRequest = (socket, sequence, payload) => {
  const { damage } = payload;
  const gameSession = getGameBySocket(socket);
  const { user, opponent } = gameSession.getUsers(socket);

  const { currentHp, isGameOver } = gameSession.setBaseHit(user, damage);

  const currentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    user.getNextSequence(),
    {
      isOpponent: false,
      baseHp: currentHp,
    },
  );
  user.socket.write(currentHpResponse);
  const otherUserCurrentHpResponse = createResponse(
    PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    opponent.getNextSequence(),
    {
      isOpponent: true,
      baseHp: currentHp,
    },
  );
  opponent.socket.write(otherUserCurrentHpResponse);

  if (isGameOver) {
    const loseResponse = createResponse(
      PACKET_TYPE.GAME_OVER_NOTIFICATION,
      user.getNextSequence(),
      { isWin: false },
    );
    console.log(loseResponse);
    user.socket.write(loseResponse);
    const winResponse = createResponse(
      PACKET_TYPE.GAME_OVER_NOTIFICATION,
      opponent.getNextSequence(),
      {
        isWin: true,
      },
    );
    console.log(winResponse);
    opponent.socket.write(winResponse);
  }
};

export default monsterAttackBaseRequest;
