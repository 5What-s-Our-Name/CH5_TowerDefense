import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createResponse } from '../../utils/response/createResponse.js';

const towerPurchaseRequest = (socket, sequence, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { user, opponent } = gameSession.getUsers(socket);
    const { x, y } = payload;
    const towerId = user.addTower(x, y);

    user.socket.write(
      createResponse(PACKET_TYPE.TOWER_PURCHASE_RESPONSE, user.getNextSequence(), { towerId }),
    );

    opponent.socket.write(
      createResponse(PACKET_TYPE.ADD_ENEMY_TOWER_NOTIFICATION, opponent.getNextSequence(), {
        towerId,
        x,
        y,
      }),
    );
  } catch (error) {
    handleErr(socket, 1, error);
  }
};

export default towerPurchaseRequest;
