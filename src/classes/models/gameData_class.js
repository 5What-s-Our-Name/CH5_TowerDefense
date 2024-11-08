import { initialGameState } from '../../assets/init.js';
import { uuid } from '../../utils/util/uuid.js';
import User from './user_class.js';
import { monsterInfo } from '../../assets/monster.js';

class GameData extends User {
  constructor(userInstance) {
    super(userInstance.socket, userInstance.userId);

    this.score = 0;
    this.gold = initialGameState.initialGold;
    this.towerList = [];
    this.monsterList = [];
    this.hp = initialGameState.baseHp;
  }

  minusGold() {
    // TODO 검증 필요
    this.gold -= initialGameState.towerCost;
  }

  getScore() {
    return this.score;
  }

  getGold() {
    return this.gold;
  }

  getTowerList() {
    return this.towerList;
  }

  getMonsterList() {
    return this.monsterList;
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
    const towerId = uuid();
    this.minusGold();
    this.towerList.push({ towerId, x, y });
    return towerId;
  }

  addMonster() {
    const monsterId = uuid();
    const monsterNumber = Math.floor(Math.random() * 5) + 1;
    monsterInfo[monsterNumber - 1];
    this.monsterList.push({
      monsterId,
      monsterNumber,
      level: 1,
      gold: monsterInfo[monsterNumber - 1].gold,
      score: monsterInfo[monsterNumber - 1].score,
    });
    console.log('몬스터 리스트 확인 : ', this.monsterList);
    return { monsterId, monsterNumber };
  }
}

export default GameData;
