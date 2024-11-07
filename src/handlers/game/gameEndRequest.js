const gameEndRequest = (socket, damage) => {
  const user = getUserBySocket(socket);
  const game = getMyGameSession(user.userId);
  game.gameEndNotification(user.userId);
};

export default gameEndRequest;
