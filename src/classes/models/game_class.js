import { MAX_PLAYERS } from '../../constants/sessions.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { initialGameState, opponentData, playerData } from '../../assets/init.js';
import { delay } from '../../utils/util/delay.js';
import { copyInstance } from '../../utils/game/copyInstance.js';

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
  async addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('방에 유저가 꽉 찬 상태 입니다.');
    }
    // user를 복사하고 playerData를 추가
    const newUser = copyInstance(user);
    this.users.push(newUser);

    if (this.users.length === MAX_PLAYERS) {
      await delay(2000);
      // 만약 대기 도중 나갔을 때
      if (this.getUserCount() === MAX_PLAYERS) {
        this.startGame();
      }
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

  startGame() {
    this.state = false;

    this.users.forEach((user, index) => {
      const payload = !index
        ? { initialGameState, playerData, opponentData }
        : { initialGameState, playerData: opponentData, opponentData: playerData };

      const startPacket = createResponse(
        PACKET_TYPE.MATCH_START_NOTIFICATION,
        user.getNextSequence(),
        payload,
      );

      user.getSocket().write(startPacket);
    });
  }

  setBaseHit(user, damage) {
    user.hp -= damage;
    const currentHp = user.hp;
    const isGameOver = currentHp <= 0;
    return { currentHp, isGameOver };
  }

  addTower(socket, x, y) {
    const user = this.getUser(socket);
    user.gold -= initialGameState.towerCost;
    const towerId = uuid();
    user.towerList.push({ towerId, x, y });
    return towerId;
  }

  //  유저가 가지고 있는 전체 타워 리스트 반환
  getTowerList(socket) {
    const user = this.getUser(socket);
    return user.towerList;
  }
}
export default Game;
