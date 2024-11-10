import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProto.js';
import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getUserBySocket } from '../../sessions/user_session.js';
import CustomErr from '../../utils/error/customErr.js';
import { handleErr } from '../../utils/error/handlerErr.js';
const matchRequest = (socket) => {
  try {
    const user = getUserBySocket(socket);

    if (!user) {
      throw CustomErr(GlobalFailCode.UNKNOWN_ERROR, '유저를 찾을 수 없습니다.');
    }

    let gameSession = getMyGameSession(user.getUserId());

    if (gameSession) {
      throw CustomErr(GlobalFailCode.UNKNOWN_ERROR, '게임 세션 안에 존재하는 유저 입니다.');
    }

    gameSession = getGameSession();
    gameSession.addUser(user);
  } catch (error) {
    handleErr(socket, PACKET_TYPE.MATCH_REQUEST, error);
  }
};

export default matchRequest;
