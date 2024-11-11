import { uuid } from '../../utils/util/uuid.js';
import User from './user_class.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { config } from '../../config/config.js';
import { monsterInfo } from './../../assets/monster';

class GameData extends User {
  constructor(userInstance) {
    super(userInstance.socket, userInstance.userId);

    this.score = 0;
    this.gold = config.init.initialGold;
    this.towerMap = new Map();
    this.monsterMap = new Map();
    this.hp = config.init.baseHp;
  }

  minusGold() {
    this.gold -= config.init.towerCost;
  }

  getTowerList() {
    return [...this.towerMap.values()];
  }

  getMonsterList() {
    return [...this.monsterMap.values()];
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
    this.towerMap.set(towerId, { towerId, x, y });
    this.minusGold();
    return towerId;
  }

  addMonster() {
    const monsterId = uuid();
    const monsterNumber = Math.floor(Math.random() * 5) + 1;
    const monster = {
      monsterId,
      monsterNumber,
      level: 1,
    };
    this.monsterMap.set(monsterId, monster);
    return monster;
  }

  removeMonster(monsterId = undefined) {
    if (monsterId === undefined) {
      const firstMonsterId = this.monsterMap.keys().next().value;
      this.monsterMap.delete(firstMonsterId);
    } else {
      const monster = this.monsterMap.get(monsterId);
      if (monster) {
        this.getMonsterSearchAndReward(monster);
        this.monsterMap.delete(monsterId);
      }
    }
    this.sync();
  }
  getMonsterSearchAndReward = (monster) => {
    const reward = monsterInfo[monster.monsterNumber - 1];
    this.gold += reward.gold;
    this.score += reward.score;
  };

  sync() {
    this.socket.write(
      createResponse(PACKET_TYPE.STATE_SYNC_NOTIFICATION, this.getNextSequence(), {
        userGold: this.gold,
        baseHp: this.hp,
        monsterLevel: this.score / 1000 + 1,
        score: this.score,
        towers: [...this.towerMap.values()],
        monsters: [...this.monsterMap.values()],
      }),
    );
  }
}

export default GameData;
