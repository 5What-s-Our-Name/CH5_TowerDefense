import { getUserBySocket } from '../../sessions/user_session.js';

const monsterAttackBaseRequest = (socket, damage) => {
  const user = getUserBySocket(socket);

  user.setBaseHit(damage);
};

export default monsterAttackBaseRequest;
