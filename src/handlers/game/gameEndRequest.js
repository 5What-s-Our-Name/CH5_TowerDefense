const gameEndRequest = (socket) => {
  const user = getUserBySocket(socket);
  // HP가 0 이하일 때만 게임 종료
  if (user.getBaseHp() <= 0) {
    const game = getMyGameSession(user.userId);
    if (game) {
      game.gameEndNotification(socket);
    } else {
      console.error(`Game session not found for user ID: ${user.userId}`);
    }
  }
};

export default gameEndRequest;
