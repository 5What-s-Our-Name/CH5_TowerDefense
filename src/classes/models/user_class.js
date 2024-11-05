class User {
  constructor(socket, userId) {
    this.socket = socket;
    // 소켓을 담을 변수
    this.userId = userId;
    // 유저의 아이디를 담을 변수
  }

  getSocket() {
    return this.socket;
    // 유저의 소켓 반환
  }

  getUserId() {
    return this.userId;
    // 유저의 아이디 반환
  }
}
