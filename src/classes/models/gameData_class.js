import { initialGameState } from '../../assets/init.js';
import { uuid } from '../../utils/util/uuid.js';
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

  setBaseHit(damage) {
    this.hp -= damage;
    const currentHp = this.hp;
    const isGameOver = currentHp <= 0;
    return { currentHp, isGameOver };
  }

  addTower(x, y) {
    this.gold -= initialGameState.towerCost;
    const towerId = uuid();
    this.towerList.push({ towerId, x, y });
    return towerId;
  }

  //  유저가 가지고 있는 전체 타워 리스트 반환
  getTowerList() {
    return this.towerList;
  }
}

export default GameData;
