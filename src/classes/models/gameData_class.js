import { initialGameState } from '../../assets/init.js';
import { uuid } from '../../utils/util/uuid.js';
import User from './user_class.js';
import { monsterInfo } from '../../assets/monster.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

class GameData extends User {
  constructor(userInstance) {
    super(userInstance.socket, userInstance.userId);

    this.score = 0;
    this.gold = initialGameState.initialGold;
    this.towerList = [];
    this.monsterList = [];
    this.hp = initialGameState.baseHp;
    this.sequenceList = [];
  }

  minusGold() {
    // TODO 검증 필요
    this.gold -= initialGameState.towerCost;
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
    return this.hp;
  }

  addTower(x, y) {
    const towerId = uuid();
    this.minusGold();
    this.towerList.push({ towerId, x, y });
    return towerId;
  }

  addSequenceList(sequence) {
    this.sequenceList.push(sequence);
  }

  getSequenceList() {
    return this.sequenceList;
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
    return { monsterId, monsterNumber };
  }

  removeMonster(monsterId = undefined) {
    let monster;
    if (monsterId === undefined) {
      monster = this.monsterList.shift();
    } else {
      const index = this.monsterList.findIndex((monster) => monster.monsterId === monsterId);
      monster = this.monsterList.splice(index, 1)[0];
    }
    this.getMonsterSearchAndReward(monster);
    this.sync();
  }

  // 나와 상대한테 상태동기화를 위한
  sync() {
    this.socket.write(
      createResponse(PACKET_TYPE.STATE_SYNC_NOTIFICATION, this.getNextSequence(), {
        userGold: this.gold,
        baseHp: this.hp,
        monsterLevel: this.score / 1000 + 1,
        score: this.score,
        towers: this.towerList,
        monsters: this.monsterList,
      }),
    );
  }

  getMonsterSearchAndReward = (monster) => {
    const reward = monsterInfo[monster.monsterNumber - 1];

    this.gold += reward.gold;
    this.score += reward.score;

    return { getGold: this.gold, getScore: this.score };
  };
}

export default GameData;
