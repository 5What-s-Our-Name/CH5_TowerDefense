import { parsePacket } from '../utils/parser/packetParser.js';
import { config } from '../config/config.js';
import { GamePacket, GlobalFailCode } from '../init/loadProto.js';
import { PACKET_TYPE_REVERSED } from '../constants/header.js';
import { snakeToCamel } from './../utils/formatter/snakeToCamel.js';
import { getHandlers } from '../init/loadHandlers.js';
import { handleErr } from '../utils/error/handlerErr.js';
import CustomErr from '../utils/error/customErr.js';
import { handleIncomingPacket } from './../utils/sequence/C2SSequence.js';

export const onData = (socket) => (data) => {
  // 기존 버퍼에 데이터 추가
  socket.buffer = Buffer.concat([socket.buffer, data]);

  // 패킷 타입 + 버전 길이
  const typeAndVersionLength = config.packet.typeLength + config.packet.versionLength;
  let packet;
  while (socket.buffer.length > 0) {
    if (socket.buffer.length >= typeAndVersionLength) {
      packet = parsePacket(socket);
      if (!packet) {
        break;
      }
    }
  }
  // 패킷 파서에서 가져옴
  const { version, packetType } = packet;

  if (version !== config.client.version) {
    throw new CustomErr(GlobalFailCode.INVALID_REQUEST, 'Check to version');
  }

  try {
    handleIncomingPacket(socket, packet);
  } catch (err) {
    handleErr(socket, packetType, err);
  }
};
