import { getGameSession, getMyGameSession } from '../../sessions/game_session.js';
import { getUserBySocket } from '../../sessions/user_session.js';
const matchRequest = (socket) => {
  const user = getUserBySocket(socket);

  if (!user) {
    throw Error('유저를 찾을 수 없습니다.');
  }

  // 이미 참여 중인 게임 세션이 있는지 확인
  let gameSession = getMyGameSession(user.getUserId());

  // 참여 중인 게임 세션이 있을 경우 오류 발생
  if (gameSession) {
    throw Error('게임 세션 안에 존재하는 유저 입니다.');
  }

  /*
   gameSession에는 Game Class의 instance가 반환되는 상황이다.
   해당 instance는 아래와 같이 생성 혹은 존재하던 instance이다.

   만약 게임 세션(현재 대기, 진행 중인 모든 Game Class instance를 담는 배열)
   에 요소로 Game Class instance 없거나 만석이면,
   새로운 Game Class instance가  만들져 반환된다.

   반대로, 만석이 아닌 Game Class instance가 있다면 해당 Game Class instance를 반환해준다.
  */
  gameSession = getGameSession();

  /*
   그래서 Game Class instance는 addUser(user)로
   matching을 돌리기 시작한 유저를 해당 게임에 속하게 해준다.
  */
  gameSession.addUser(user);
  // addUser에서 while문으로 유저가 2명이 아니면 무한 반복을 시켜줘야 한다고 생각했습니다.
  // 그래야 해당 게임에 존재하는 2명의 유저에게 서버가 클라이언트로 응답을 제공할 수 있다고 생각했습니다.
};

export default matchRequest;
