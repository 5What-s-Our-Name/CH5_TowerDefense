import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProto.js';
import { getGameBySocket } from '../../sessions/game_session.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createResponse } from '../../utils/response/createResponse.js';
import CustomErr from './../../utils/error/customErr.js';

const towerPurchaseRequest = (socket, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { user, opponent } = gameSession.getUsers(socket);
    const { x, y } = payload;

    if (user.gold < config.init.towerCost)
      throw new CustomErr(GlobalFailCode.INVALID_REQUEST, 'Not enough gold');

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
    handleErr(socket, PACKET_TYPE.TOWER_PURCHASE_RESPONSE, error);
  }
};

export default towerPurchaseRequest;
