import { initialGameState } from '../../assets/init.js';
import User from './user_class.js';

class GameData extends User {
  constructor(userInstance) {
    super(userInstance.socket, userInstance.userId);

    this.score = 0;
    this.gold = initialGameState.initialGold;
    this.towerList = [];
    this.hp = initialGameState.baseHp;
  }

  getScore() {
    return this.score;
    // 유저의 소켓 반환
  }

  getGold() {
    return this.gold;
    // 유저의 아이디 반환
  }

  getTowerList() {
    return this.towerList;
  }

  getHp() {
    return this.hp;
  }
}

export default GameData;
