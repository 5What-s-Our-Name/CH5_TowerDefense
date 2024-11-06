import CustomErr from '../../utils/error/customErr.js';
import { MAX_PLAYERS } from '../../constants/sessions.js';
import { errCodes } from '../../utils/error/errCodes.js';
import { gameStartNotification } from '../../utils/notification/game.notification.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
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
      new Error('방에 유저가 꽉 찬 상태 입니다.');
    }
    this.users.push(user);
    // 방에 유저가 2명 미만일 경우 방에 유저 추가

    waitingGame();
    /*
     방에 유저가 1명 있을 경우 대기 및 2명이 오면 게임 시작을 위해 작성
     addUser waitingGame()의 로직을 넣어도 되지만 더 깨끗한 로직 관리를 위해 분리
    */
  }

  waitingGame() {
    // 대기 상태이면 true, 게임 진행이면 false로
    // 1명이 게임 방에 존재할 경우, 다른 유저가 올 때 까지
    // 1명의 유저를 대기시켜야 한다고 생각해서 아래와 같이 구현했습니다.
    while (this.state) {
      // 유저가 2명가 충족하는 인원(MAX_PLAYERS)이면
      // 3초 후 게임 시작 로직을 동작 시킵니다.
      if (this.users.length === MAX_PLAYERS) {
        setTimeout(() => {
          this.startGame();
        }, 3000);
        break;
        // 혹시 반복문에 의해 다시 게임이 실행될까봐 break 처리 했습니다.
      }
    }
    // 현재 while(this.state)로
    // 유저가 2명이 아닐 경우 무한 반복 중
    // => CPU 낭비
    // => 원래는 Lock으로 CPU 낭비를 없애야 하는 상황
  }
  isGameStart() {
    return this.state;
  }

  getUser(userId) {
    return this.users.find((user) => user.userId === userId);
    // 해당 방에 유저가 존재하는지 조회
  }

  removeUser(userId) {
    this.users = this._users.filter((user) => user.userId !== userId);
  }

  startGame() {
    this.state = false;
    // 상태가 게임 진행 상태로 변경해주고,

    const startPacket = createResponse(PACKET_TYPE.MATCH_START_NOTIFICATION, this.users);
    // gameStartNotification으로 해당 방의 id(uuidv4로 생성 돼 중복이 없습니다.)와
    // 게임이 시작될 시간을 현재 제공 중 입니다.
    this.users.forEach((user) => {
      user.getSocket().write(startPacket);
    });
  }
}

export default Game;
