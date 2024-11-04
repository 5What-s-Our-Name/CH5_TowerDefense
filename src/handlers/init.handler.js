import { createResponse } from '../utils/response/createResponse.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../constants/handlerIds.js';

export const initHandler = async (socket, userId, payload) => {
  // 최초 연결 시 처리해야 될 내용 추가

  const initResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId, lastX, lastY },
    userId,
  );

  socket.write(initResponse);
};
