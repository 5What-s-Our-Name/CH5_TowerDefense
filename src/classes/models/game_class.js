import CustomErr from '../../utils/error/customErr.js';
import { MAX_PLAYERS } from '../../constants/sessions.js';
import { errCodes } from '../../utils/error/errCodes.js';
class Game {
  constructor(gameId) {
    this._gameId = gameId;
    // 방 고유 아이디
    this._users = [];
    // 방을 만든 유저와 상대방을 저장할 배열
    this._state = 'waiting';
  }

  get getGameId() {
    return this._gameId;
  }

  // 방의 모든 유저 전달
  get getAllUsers() {
    return this._users;
  }

  addUser(user) {
    if (this._users.length >= MAX_PLAYERS) {
      // 방에 유저가 2명 이상일 경우 방이 꽉찬 상태라 오류를 뜻한다.
      throw new CustomErr(errCodes.GAME_FULL_USER, '방에 유저가 꽉 찬 상태 입니다.');
    }
    this._users.push(user);
    // 방에 유저가 2명 미만일 경우 방에 유저 추가
    if (this._users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  }

  getUserCount() {
    return this._users.length;
  }

  getUser(userId) {
    return this._users.find((user) => (user.userId = userId));
    // 해당 방에 유저가 존재하는지 조회
  }

  removeUser(userId) {
    this._users = this._users.filter((user) => user.userId !== userId);
  }

  startGame() {
    this._state = 'inProgress';
    const startPacket = gameStartNotification(this._gameId, Date.now());

    this._users.forEach((user) => {
      user.getSocket().write(startPacket);
    });
  }
}

export default Game;
