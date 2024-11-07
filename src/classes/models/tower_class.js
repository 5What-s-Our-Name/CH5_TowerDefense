import { v4 as uuidV4 } from 'uuid';
class Tower {
  constructor(x, y) {
    this.x = x;
    //타워의 x좌표
    this.y = y;
    //타워의 y좌표
    this.towerId = uuidV4();
    //타워의 고유uuid
  }
  getCoordinateX() {
    return this.x;
    // 타워의 x좌표값 반환
  }

  getCoordinateY() {
    return this.y;
    // 타워의 y좌표값 반환
  }
  getTowerId() {
    return this.towerId;
    // 타워의 uuid값 반환
  }
}

export default Tower;
