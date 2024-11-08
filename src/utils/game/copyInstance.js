import GameData from '../../classes/models/gameData_class.js';

export const copyInstance = (instance) => {
  const copyInstance = new GameData(instance);
  return copyInstance;
};
