import { getGameSession } from '../../../sessions/game_session.js';

export const joinGameSession = (user) => {
  const gameSession = getGameSession();
  console.log(gameSession);
  gameSession.addUser(user);
};
