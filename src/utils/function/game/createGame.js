import { v4 as uuidv4 } from 'uuid';
import { addGameSession } from '../../../sessions/game_session.js';
import { createResponse } from '../../response/createResponse.js';
import { handleErr } from '../../error/handlerErr.js';
//import { getUserByUserId } from '../../sessions/user_session.js';
import CustomErr from '../../error/customErr.js';
import { errCodes } from '../../error/errCodes.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../../constants/handlerIds.js';
import { PACKET_TYPE } from '../../../constants/header.js';

const createGameHandler = ({ socket, userId, payload }) => {
  try {
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);

    //const user = getUserByUserId(userId);
    if (!user) {
      throw new CustomErr(errCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }
    gameSession.addUser(user);

    /*
    TODO: HANDLER_IDS와 RESPONSE_SUCCESS_CODE가 바꿔야한다.
    이유 :
    HANDLER_IDS의 위치에 Type이 들어가야 하고,
    RESPONSE_SUCCESS_CODE의 위치에는 sequence가 들어와야 하기 때문이다.
    */
    // const createGameResponse = createResponse(
    //     PACKET_TYPE.MATCH_START_NOTIFICATION, ,{
    //   gameId,
    //   message: '게임이 생성됐습니다.',
    // });
    //socket.write(createGameResponse);
  } catch (error) {
    handleErr(socket, error);
  }
};
