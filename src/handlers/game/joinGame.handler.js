import { getGameSession } from '../../sessions/game_session.js';
//import { getUserByUserId } from '../../sessions/user_session.js';
import CustomErr from '../../utils/error/customErr.js';
import { errCodes } from '../../utils/error/errCodes.js';
import { handleErr } from '../../utils/error/handlerErr.js';

const joinGameHandler = ({ socket, userId, payload }) => {
  try {
    const { gameId } = payload;
    const gameSession = getGameSession(gameId);

    if (!gameSession) {
      throw new CustomErr(errCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    /*const user = getUserByUserId(userId);
    if (!user) {
      throw new CustomErr(errCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }*/

    /*
    const existUser = gameSession.getUser(user.id)
    */
  } catch (error) {
    handleErr(socket, error);
  }
};
