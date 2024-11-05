import CustomErr from '../../utils/error/customErr.js';
import { MAX_PLAYERS } from '../../constants/sessions.js';
import { errCodes } from '../../utils/error/errCodes.js';
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
      // 방에 유저가 2명 이상일 경우 방이 꽉찬 상태라 오류를 뜻한다.
      //throw new CustomErr(errCodes.GAME_FULL_USER, '방에 유저가 꽉 찬 상태 입니다.');
    }
    this.users.push(user);
    // 방에 유저가 2명 미만일 경우 방에 유저 추가
    if (this.users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  }

  isGameStart() {
    return this.state;
  }

  getUser(userId) {
    return this.users.find((user) => (user.userId = userId));
    // 해당 방에 유저가 존재하는지 조회
  }

  removeUser(userId) {
    this.users = this._users.filter((user) => user.userId !== userId);
  }

  startGame() {
    this.state = false;
    const startPacket = gameStartNotification(this.gameId, Date.now());

    this.users.forEach((user) => {
      user.getSocket().write(startPacket);
    });
  }
}

export default Game;
