import { config } from '../config/config.js';
import { makeInitPath } from '../utils/game/makeInitPath.js';
import { makeInitTower } from '../utils/game/makeInitTower.js';

const { baseHp, towerCost, initialGold, monsterSpawnInterval, monsterLevel, towerCount } =
  config.init;

export const initialGameState = {
  baseHp,
  towerCost,
  initialGold,
  monsterSpawnInterval,
};

export const initData = () => {
  const towers = makeInitTower(3);
  const playerPath = makeInitPath();

  return {
    gold: initialGold, // 현재 골드
    baseHp, // 기지의 현재 HP
    maxHp: baseHp, // 기지의 최대 HP
    highScore: 0, // 플레이어의 최고 점수
    towers,
    monsters: [],
    monsterLevel, // 몬스터의 현재 레벨
    score: 0, // 플레이어의 현재 점수
    monsterPath: playerPath[0],
    basePosition: playerPath[1], // 기지 위치
  };
};
