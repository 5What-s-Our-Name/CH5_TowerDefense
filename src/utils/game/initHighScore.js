import { opponentData, playerData } from '../../assets/init.js';
import { getHighScore } from './score.js';
export const initHighScore = async (users) => {
  const scores = await Promise.all(users.map((user) => getHighScore(user.userId)));

  const data = [playerData, opponentData];

  scores.forEach((score, index) => {
    index === 0
      ? (data[index].highScore = score.high_score)
      : (data[index].highScore = score.high_score);
  });

  return { playerData: data[0], opponentData: data[1] };
};
