import { uuid } from '../../utils/util/uuid.js';
import User from './user_class.js';
import { monsterInfo } from '../../assets/monster.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { config } from '../../config/config.js';

class GameData extends User {
  constructor(userInstance) {
    super(userInstance.socket, userInstance.userId);

    this.score = 0;
    this.gold = config.init.initialGold;
    this.towerList = [];
    this.monsterList = [];
    this.hp = config.init.baseHp;
  }

  minusGold() {
    this.gold -= config.init.towerCost;
  }

  getTowerList() {
    return this.towerList;
  }

  // getTowerSearch(towerId) {
  //   return this.towerList.find((tower) => tower.towerId === towerId);
  // }

  getMonsterList() {
    return this.monsterList;
  }

  getHp() {
    return this.hp;
  }

  setBaseHit(damage) {
    this.hp -= damage;
    return Math.floor(this.hp);
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
    });
    return { monsterId, monsterNumber };
  }

  removeMonster(monsterId = undefined) {
    if (monsterId === undefined && this.monsterList.length > 0) {
      this.monsterList.shift();
    } else if (this.monsterList.length > 0) {
      const index = this.monsterList.findIndex((monster) => monster.monsterId === monsterId);
      if (index !== -1) {
        const monster = this.monsterList.splice(index, 1)[0];
        if (monster) this.getMonsterSearchAndReward(monster); // 죽인 몬스터가 진짜 있을 경우
      }
    }
    this.sync();
  }

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
  };
}

export default GameData;
