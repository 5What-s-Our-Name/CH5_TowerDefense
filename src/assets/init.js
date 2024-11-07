export const initialGameState = {
  baseHp: 100,
  towerCost: 1000,
  initialGold: 10000,
  monsterSpawnInterval: 2000,
};

export const playerData = {
  gold: 150, // 현재 골드
  baseHp: 100, // 기지의 현재 HP
  maxHp: 100, // 기지의 최대 HP
  highScore: 0, // 플레이어의 최고 점수
  towers: [
    // 플레이어의 타워 목록
    { id: 1, x: 900, y: 400 },
    { id: 2, x: 1000, y: 400 },
    { id: 3, x: 1100, y: 400 },
  ],
  monsters: [],
  monsterLevel: 1, // 몬스터의 현재 레벨
  score: 0, // 플레이어의 현재 점수
  monsterPath: [
    // 몬스터 이동 경로
    { x: 0, y: 250 },
    { x: 50, y: 250 },
    { x: 110, y: 270 },
    { x: 170, y: 250 },
    { x: 230, y: 230 },
    { x: 290, y: 250 },
    { x: 350, y: 250 },
    { x: 410, y: 250 },
    { x: 470, y: 250 },
    { x: 530, y: 250 },
    { x: 590, y: 250 },
    { x: 650, y: 250 },
    { x: 710, y: 250 },
    { x: 770, y: 250 },
    { x: 830, y: 250 },
    { x: 890, y: 250 },
    { x: 950, y: 250 },
    { x: 1010, y: 250 },
    { x: 1070, y: 250 },
    { x: 1130, y: 250 },
    { x: 1190, y: 250 },
  ],
  basePosition: { x: 1250, y: 250 }, // 기지 위치
};

export const opponentData = {
  gold: 120,
  baseHp: 100,
  maxHp: 100,
  highScore: 0,
  towers: [
    { id: 1, x: 900, y: 400 },
    { id: 2, x: 1000, y: 400 },
    { id: 3, x: 1100, y: 400 },
  ],
  monsters: [],
  monsterLevel: 1,
  score: 300,
  monsterPath: [
    { x: 50, y: 550 },
    { x: 110, y: 550 },
    { x: 170, y: 550 },
    { x: 230, y: 550 },
    { x: 290, y: 550 },
    { x: 350, y: 550 },
    { x: 410, y: 550 },
    { x: 470, y: 550 },
    { x: 530, y: 550 },
    { x: 590, y: 550 },
    { x: 650, y: 550 },
    { x: 710, y: 550 },
    { x: 770, y: 550 },
    { x: 830, y: 550 },
    { x: 890, y: 550 },
    { x: 950, y: 550 },
    { x: 1010, y: 550 },
    { x: 1070, y: 550 },
    { x: 1130, y: 550 },
    { x: 1190, y: 550 },
  ],
  basePosition: { x: 1250, y: 250 },
};
