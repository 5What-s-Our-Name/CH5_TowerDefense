import Game from '../classes/models/game_class.js';
import { MAX_PLAYERS } from '../constants/sessions.js';
import { gameSessions } from './session.js';

// 방 생성 및 게임 세션에 추가
export const addGameSession = (gameId) => {
  const game = new Game(gameId);
  // 방 Id를 바탕으로 방 생성
  gameSessions.push(game);
  // 게임 세션에 방 추가
  return game;
};

// 방 제거 및 남은 게임 세션 반환
export const removeGameSession = (gameId) => {
  const index = gameSessions.findIndex((game) => game.gameId === gameId);
  // 게임 세션 안에 있는 gameId와 같은 gameId를 가진 방 index 찾기
  if (index != -1) return gameSessions.splice(index, 1)[0];
  // 해당 방을 제거 및 나머지를 리턴
};

// 방 조회
export const getGameSession = (gameId) => {
  const sessions = getGameSessions
    .map((session) => {
      const userCnt = session.getUser().length;
      return userCnt < MAX_PLAYERS ? [session, userCnt] : null;
    })
    .filter(Boolean);

  if (sessions.length === 0) {
    // 참여 가능한 세션이 없으면 새로운 게임 세션 생성
    createGameSession();
    return gameSessions[gameSessions.length - 1];
    // 마지막으로 생성된 세션 반환
  }

  sessions.sort((a, b) => a[1] - b[1]);

  return sessions[0][0]; // 가장 적은 사용자 수가 있는 세션 반환
};

export const getMyGameSession = (userId) => {
  for (const gameSession of gameSessions) {
    if (gameSession.getUser(userId)) return gameSession;
  }
};

export const getAllGameSession = () => {
  return gameSessions.map((session) => ({ ...session }));
};