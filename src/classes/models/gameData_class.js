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
    console.log('몬스터 생성 이후 리스트 : ', this.monsterList.length);
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
    console.log('사망한 몬스터 조회 : ', monster);
    this.getMonsterSearchAndReward(monster);
    this.sync();
  }

  // 나와 상대한테 상태동기화를 위한
  sync() {
    // this.socket.write(
    //   createResponse(PACKET_TYPE.STATE_SYNC_NOTIFICATION, user.getNextSequence(), {
    //     {
    //       int32 userGold,
    //       int32 baseHp,
    //       int32 monsterLevel,
    //       int32 score,
    //       repeated TowerData towers,
    //       repeated MonsterData monsters,
    //   }
    //   }),
    // );
  }

  getMonsterSearchAndReward = (monster) => {
    console.log('몬스터 식별 : ', monster);
    const reward = monsterInfo[monster.monsterNumber - 1];

    this.gold += reward.gold;
    this.score += reward.score;

    console.log(`보상 돈 관련 ----->`, this.gold);
    console.log(`보상 점수 관련 ----->`, this.score);

    return { getGold: this.gold, getScore: this.score };
  };
}

export default GameData;
