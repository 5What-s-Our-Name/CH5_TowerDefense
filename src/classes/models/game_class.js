import { MAX_PLAYERS } from '../../constants/sessions.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { initialGameState, opponentData, playerData } from '../../assets/init.js';

import { getOpponentUserBySocket, getUserBySocket } from '../../sessions/user_session.js';

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    // 방 고유 아이디
    this.users = [];
    // 방을 만든 유저와 상대방을 저장할 배열
    this.state = true;
    // 대기 중이면 true, 게임 중이면 false
  }
  getGameId() {
    return this.gameId;
  }
  // 방의 모든 유저 수 전달
  getUserCount() {
    return this.users.length;
  }
  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      new Error('방에 유저가 꽉 찬 상태 입니다.');
    }

    this.users.push(user);

    if (this.users.length === MAX_PLAYERS) {
      this.startGame();
    }
  }
  getUsers(socket) {
    const user = this.getUser(socket);
    const opponent = this.getOpponentUser(socket);
    return { user, opponent };
  }
  getUser(socket) {
    return this.users.find((user) => user.socket === socket);
  }
  getOpponentUser(socket) {
    return this.users.find((user) => user.socket !== socket);
  }
  removeUser(socket) {
    this.users = this.users.filter((user) => user.socket !== socket);
  }
  resetUsers() {
    this.users.forEach((user) => {
      user.sequence = 0;
      user.hp = user.maxHp;
      user.gold = 2000;
      user.towerList = [];
    });
  }
  clearGameData() {
    this.state = true;
  }

  startGame() {
    this.state = false;
    let num = 0;
    this.users.forEach((user) => {
      const payload = num
        ? { initialGameState, playerData: opponentData, opponentData: playerData }
        : { initialGameState, playerData, opponentData };
      const startPacket = createResponse(
        PACKET_TYPE.MATCH_START_NOTIFICATION,
        user.getNextSequence(),
        payload,
      );
      user.getSocket().write(startPacket);
      num++;
    });
  }

  setBaseHit(user, damage) {
    user.setBaseHit(damage);
    const currentHp = user.getBaseHp();
    const isGameOver = currentHp <= 0;
    return { currentHp, isGameOver };
  }

  gameEndNotification() {
    this.resetUsers();
    this.clearGameData();
  }
}
export default Game;
