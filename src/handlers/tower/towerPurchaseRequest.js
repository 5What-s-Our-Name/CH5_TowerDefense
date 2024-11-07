import { PACKET_TYPE } from '../../constants/header.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { createResponse } from '../../utils/response/createResponse.js';

const towerPurchaseRequest = (socket, sequence, payload) => {
  const gameSession = getGameBySocket(socket);
  const { user, opponent } = gameSession.getUsers(socket);
  const { x, y } = payload;
  const towerId = user.addTower(x, y);
  const buyTowerResponse = createResponse(
    PACKET_TYPE.TOWER_PURCHASE_RESPONSE,
    user.getNextSequence(),
    { towerId },
  );
  user.socket.write(buyTowerResponse);

  const Notification = createResponse(
    PACKET_TYPE.ADD_ENEMY_TOWER_NOTIFICATION,
    opponent.getNextSequence(),
    { towerId, x, y },
  );
  opponent.socket.write(Notification);
};

export default towerPurchaseRequest;
