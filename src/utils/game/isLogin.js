import { getUserSessions } from '../../sessions/user_session.js';
import { decodeToken } from './../jwt/decodeToken.js';

export const isLogin = (id) => {
  const userSessions = getUserSessions();
  return userSessions.find((user) => {
    const { userId } = decodeToken(user.userId);
    return userId === id;
  });
};
