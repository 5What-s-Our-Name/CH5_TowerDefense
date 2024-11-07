import { v4 as uuidV4 } from 'uuid';
import { addGameSession } from '../../../sessions/game_session.js';

export const createGameSession = () => {
  const gameId = uuidV4();
  // 게임 세션 아이디는 uuid 활용 생성
  const createdGameSession = addGameSession(gameId);
  if (createdGameSession) {
    console.log(`[GAME_SESSION] Game session successfully created. - ${createdGameSession.gameId}`);
  }
};
