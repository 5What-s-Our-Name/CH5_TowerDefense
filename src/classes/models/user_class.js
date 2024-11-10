class User {
  constructor(socket, userId) {
    this.socket = socket;
    // 소켓을 담을 변수
    this.userId = userId;
    // 유저의 아이디를 담을 변수
    this.sequence = 0;
    // this.sequence = {};
  }

  getSocket() {
    return this.socket;
    // 유저의 소켓 반환
  }

  getUserId() {
    return this.userId;
    // 유저의 아이디 반환
  }

  saveSequence(packet) {
    this.getNextSequence();
    this.sequence[this.socket.S2CSequence] = packet;
    return this.socket.S2CSequence;
  }

  getNextSequence() {
    return ++this.socket.S2CSequence;
  }
}

export default User;
