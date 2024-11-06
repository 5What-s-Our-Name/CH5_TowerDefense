import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProto.js';
import pools from '../../mysql/createPool.js';
import { addUser } from '../../sessions/user_session.js';
import CustomErr from '../../utils/error/customErr.js';
import { handleErr } from '../../utils/error/handlerErr.js';
import { createJWT } from '../../utils/jwt/createToken.js';
import { createResponse } from '../../utils/response/createResponse.js';
import bcrypt from 'bcrypt';

const loginRequest = async (socket, sequence, payload) => {
  const { id } = payload;
  let { password } = payload;

  try {
    // 사용자가 입력한 user_id로 DB에서 비밀번호 해시 조회
    const sql = 'SELECT password FROM User WHERE user_id = ?';
    const [rows] = await pools.USER_DB.query(sql, [id]);

    if (rows.length === 0) {
      throw new CustomErr(GlobalFailCode.INVALID_REQUEST, 'Not Found ID');
    }

    password = password + config.auth.pepper;

    const hashedPassword = rows[0].password;

    // 입력한 비밀번호와 저장된 해시 비교
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw new CustomErr(GlobalFailCode.AUTHENTICATION_FAILED, 'Invalid password');
    }
    // 토큰생성
    const token = createJWT(id);
    // response 생성
    const response = createResponse(PACKET_TYPE.LOGIN_RESPONSE, sequence, {
      success: true,
      message: 'Login Successful',
      token,
    });

    // INCOMPLETE: 여기에 유저 등록 부분 들어가야함.
    console.log('가지고 있는 값 확인 : ', token);

    addUser(token);

    // 발송
    socket.write(response);

    // 토큰 발급
  } catch (err) {
    handleErr(socket, PACKET_TYPE.LOGIN_RESPONSE, err);
    console.error('Error during login:', err.message);
  }
};

export default loginRequest;
