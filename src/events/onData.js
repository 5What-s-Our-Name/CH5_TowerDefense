import { packetParser } from '../utils/parser/packetParser.js';
import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { handleErr } from '../utils/error/handlerErr.js';

export const onData = (socket) => (data) => {
  // 기존 버퍼에 데이터 추가
  socket.buffer = Buffer.concat([socket.buffer, data]);
  // 전체 헤더 길이 구하기
  const totalHeaderLength = config.packet.totalLength + config.packet.TypeLength;
  // 버퍼의 크기가 헤더의 길이보다 길거나 같을 때 실행
  while (socket.buffer.length >= totalHeaderLength) {
    const bufferTotalLength = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    // 소켓 버퍼의 길이가 데이터 총 길이보다 길 때 추출
    if (socket.buffer.length >= bufferTotalLength) {
      const packet = socket.buffer.slice(totalHeaderLength, bufferTotalLength);
      socket.buffer = socket.buffer.slice(bufferTotalLength);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);
            handler(socket, userId, payload);
            break;
          default:
            console.warn(`Unknown packet type: ${packetType}`);
        }
      } catch (err) {
        handleErr(socket, err);
      }
    } else {
      break;
    }
  }
};
