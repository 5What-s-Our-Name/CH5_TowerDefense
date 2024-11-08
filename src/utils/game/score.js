import pools from '../../mysql/createPool.js';
import { decodeToken } from '../jwt/decodeToken.js';
export const saveHighScore = async (token, score) => {
  const { userId } = decodeToken(token);

  const query = 'UPDATE User SET high_score = ? WHERE user_id = ? AND high_score < ?';
  const [rows] = await pools.USER_DB.query(query, [score, userId, score]);
};
export const getHighScore = async (token) => {
  const { userId } = decodeToken(token);
  const query = 'SELECT high_score FROM User WHERE user_id = ?';
  const [rows] = await pools.USER_DB.query(query, [userId]);

  return rows[0];
};
