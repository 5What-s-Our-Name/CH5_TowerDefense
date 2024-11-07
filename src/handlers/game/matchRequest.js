import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getUserBySocket } from '../../sessions/user_session.js';
const matchRequest = (socket) => {
  const user = getUserBySocket(socket);
  if (!user) {
    throw Error('유저를 찾을 수 없습니다.');
  }
  let gameSession = getMyGameSession(user.getUserId());

  if (gameSession) {
    throw Error('게임 세션 안에 존재하는 유저 입니다.');
  }
  gameSession = getGameSession();

  gameSession.addUser(user);
};

export default matchRequest;
