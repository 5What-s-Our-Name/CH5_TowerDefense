import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const createResponse = (handlerId, responseCode, data = null, userId) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = Response.encode(responsePayload).finish();
  const packetTotalLength = Buffer.alloc(config.packet.totalLength);
  packetTotalLength.writeUInt32BE(
    config.packet.totalLength + config.packet.TypeLength + buffer.length,
    0,
  );
  const typeLength = Buffer.alloc(config.packet.TypeLength);
  typeLength.writeUInt8(PACKET_TYPE.NORMAL, 0);

  return Buffer.concat([packetTotalLength, typeLength, buffer]);
};
