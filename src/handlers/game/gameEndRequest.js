const gameEndRequest = (socket) => {
  const user = getUserBySocket(socket);
  if (user.getBaseHp() < 0) {
    const game = getMyGameSession(user.userId);
    game.gameEndNotification(socket);
  }
};

export default gameEndRequest;
