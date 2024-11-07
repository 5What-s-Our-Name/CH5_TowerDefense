const gameEndRequest = (socket, damage) => {
  const user = getUserBySocket(socket);

  user.setBaseHit(damage);

  const game = getMyGameSession(user.userId);
  game.gameEndNotification(user.userId);
};

export default gameEndRequest;
