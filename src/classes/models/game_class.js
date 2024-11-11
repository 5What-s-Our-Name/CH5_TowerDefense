import { MAX_PLAYERS } from '../../constants/sessions.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { initialGameState } from '../../assets/init.js';
import { copyInstance } from '../../utils/game/copyInstance.js';
import { initHighScore } from '../../utils/game/initHighScore.js';

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.users = new Map();
    this.state = true;
  }
  getGameId() {
    return this.gameId;
  }
  // 방의 모든 유저 수 전달
  getUserCount() {
    return this.users.size;
  }
  async addUser(user) {
    if (this.users.size >= MAX_PLAYERS) {
      throw new Error('방에 유저가 꽉 찬 상태 입니다.');
    }
    // user를 복사하고 playerData를 추가
    const newUser = copyInstance(user);
    this.users.set(newUser.socket.name, newUser);

    if (this.users.size === MAX_PLAYERS) {
      if (this.getUserCount() === MAX_PLAYERS) {
        this.startGame();
      }
    }
  }

  getUsers(socket) {
    return { user: this.getUser(socket), opponent: this.getOpponentUser(socket) };
  }

  getUser(socket) {
    return this.users.get(socket.name);
  }
  getOpponentUser(socket) {
    for (const [key, user] of this.users) {
      if (key !== socket.name) {
        return user;
      }
    }
    return null;
  }
  removeUser(socket) {
    this.users.delete(socket.name);
  }

  async startGame() {
    const { playerData, opponentData } = await initHighScore([...this.users.values()]);

    let index = 0;
    for (const [_, user] of this.users) {
      const isFirstPlayer = index === 0;
      const payload = {
        initialGameState,
        playerData: isFirstPlayer ? playerData : opponentData,
        opponentData: isFirstPlayer ? opponentData : playerData,
      };

      user.towerList = isFirstPlayer ? playerData.towers : opponentData.towers;

      const startPacket = createResponse(
        PACKET_TYPE.MATCH_START_NOTIFICATION,
        user.getNextSequence(),
        payload,
      );

      user.getSocket().write(startPacket);
      index++;
    }
  }
}
export default Game;
