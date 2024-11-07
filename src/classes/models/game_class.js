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
      // 방에 유저가 2명 이상일 경우 방이 꽉찬 상태라 오류를 뜻한다.
      //throw new CustomErr(errCodes.GAME_FULL_USER, '방에 유저가 꽉 찬 상태 입니다.');
      new Error('방에 유저가 꽉 찬 상태 입니다.');
    }
    if (user) {
      this.users.push(user);
      console.log('this.users 배열: ', this.users);
    } else {
      console.error(`The user is not pushed`);
    }
    // 방에 유저가 2명 미만일 경우 방에 유저 추가

    if (this.users.length === MAX_PLAYERS) {
      this.startGame();
    }
    /*
     방에 유저가 1명 있을 경우 대기 및 2명이 오면 게임 시작을 위해 작성
     addUser waitingGame()의 로직을 넣어도 되지만 더 깨끗한 로직 관리를 위해 분리
    */
  }

  isGameStart() {
    return this.state;
  }

  getUser(userId) {
    return this.users.find((user) => user.userId === userId);
    // 해당 방에 유저가 존재하는지 조회
  }

  getOpponentUser(userId) {
    return this.users.find((user) => user.userId !== userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.userId !== userId);
  }

  makeMonster(monster, socket) {
    // console.log('monster : ', monster, ', socket : ', socket);
    const user = getUserBySocket(socket);
    const response = createResponse(PACKET_TYPE.SPAWN_MONSTER_RESPONSE, user.getNextSequence(), {
      ...monster,
    });
    user.socket.write(response);
    const opponent = this.getOpponentUser(user.userId);
    const opponentResponse = createResponse(
      PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION,
      opponent.getNextSequence(),
      {
        ...monster,
      },
    );
    opponent.socket.write(opponentResponse);
  }

  startGame() {
    this.state = false;
    // 상태가 게임 진행 상태로 변경해주고,

    // gameStartNotification으로 해당 방의 id(uuidV4로 생성 돼 중복이 없습니다.)와
    // 게임이 시작될 시간을 현재 제공 중 입니다.

    this.users.forEach((user) => {
      console.log(`${this.gameId} Game Start`);

      const startPacket = createResponse(
        PACKET_TYPE.MATCH_START_NOTIFICATION,
        user.getNextSequence(),
        { initialGameState, playerData, opponentData },
      );
      user.getSocket().write(startPacket);
    });
  }

  setBaseHit(socket, damage) {
    console.log(`damage: ${damage}`);
    const user = getUserBySocket(socket);
    const otherUser = getOpponentUserBySocket(socket);

    const currentHp = user.getBaseHp();
    if (user) {
      user.setBaseHit(damage);
      const currentHpResponse = createResponse(
        PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
        user.getNextSequence(),
        {
          isOpponent: false,
          baseHp: currentHp,
        },
      );
      console.log('userCurrentHpResponse: ', currentHpResponse);
      user.socket.write(currentHpResponse);
      const otherUserCurrentHpResponse = createResponse(
        PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
        otherUser.getNextSequence(),
        {
          isOpponent: true,
          baseHp: currentHp,
        },
      );
      console.log('otherUserCurrentHpResponse :', otherUserCurrentHpResponse);
      otherUser.socket.write(otherUserCurrentHpResponse);
    } else {
      console.error(`User with socket ${socket} not found`);
    }
    console.log(`currentHp: ${currentHp}`);
  }

  gameEndNotification(socket) {
    const loseUser = getUserBySocket(socket);

    const loseResponse = createResponse(
      PACKET_TYPE.GAME_OVER_NOTIFICATION,
      user.getNextSequence(),
      { isWin: false },
    );
    loseUser.getSocket().write(loseResponse);

    const winUser = getOpponentUserBySocket(socket);

    const winResponse = createResponse(PACKET_TYPE.GAME_END_REQUEST, winUser.getNextSequence(), {
      isWin: true,
    });
    winUser.socket.write(notification);
  }
}

export default Game;
