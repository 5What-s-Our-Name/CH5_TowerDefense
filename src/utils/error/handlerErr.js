import { createResponse } from '../response/createResponse.js';
import { errCodes } from './errCodes.js';
export const handleErr = (socket, err) => {
  let responseCode;
  let message;

  if (err.code) {
    responseCode = err.code;
    message = err.message;
    console.error(`Error Code: ${responseCode}, Message : ${message}`);
  } else {
    responseCode = errCodes.SOCKET_ERR;
    message = err.message;
    console.error(`Socket Error: ${message}`);
  }

  const errResponse = createResponse(-1, responseCode, { message }, null);
  socket.write(errResponse);
};
