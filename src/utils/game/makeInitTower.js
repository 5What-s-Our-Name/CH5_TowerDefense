import { uuid } from '../util/uuid.js';

export const makeInitTower = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const towerId = uuid();
    const x = Math.floor(Math.random() * 1000) + 100;
    const y = 350;

    result.push({ towerId, x, y });
  }
  return result;
};
