const gameEndRequest = (socket) => {
  const user = getUserBySocket(socket);
  const game = getMyGameSession(user.userId);
  game.gameEndNotification(user.userId);
};

export default gameEndRequest;
