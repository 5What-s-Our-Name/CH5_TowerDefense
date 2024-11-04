/**
 * CustomErr 인스턴스를 생성합니다.
 *
 * @param {number} code - 에러 유형을 식별하는 고유 에러 코드입니다.
 * @param {string} message - 에러에 대한 설명 메시지입니다.
 */
class CustomErr extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'CustomErr';
  }
}

export default CustomErr;
