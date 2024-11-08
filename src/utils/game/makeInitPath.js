export const makeInitPath = () => {
  const monsterPath = [];

  for (let i = 0; i < 25; i++) {
    const x = i * 60;
    const y = Math.floor(Math.random() * 21) + 240; // yRange 범위 내의 랜덤 Y 값

    monsterPath.push({ x, y });
  }
  const base = monsterPath[monsterPath.length - 1];
  return [monsterPath, base];
};
