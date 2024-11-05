import { config } from '../../config/config.js';
import { PACKET_TYPE_REVERSED } from '../../constants/header.js';
import { getHandlers } from '../../init/loadHandlers.js';
import { getProtoMessages } from '../../init/loadProto.js';
import { s2cConvert } from '../formatter/s2cConvert.js';
import { snakeToCamel } from './../formatter/snakeToCamel.js';

export const createResponse = (Type, data = null, failCode = 0) => {
  const protoMessages = getProtoMessages();
  const typeName = PACKET_TYPE_REVERSED[Type];
  const camel = snakeToCamel(typeName);
  const convertedName = s2cConvert(camel);
  // loadProto pkg 가 없는 경우 undefined
  const Response = protoMessages[convertedName].undefined;
  const createdPayload = Response.create(data);
  const payload = Response.encode(createdPayload).finish();

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt16BE(Type, 0);

  const versionLength = Buffer.alloc(config.packet.versionLength);
  const vLen = config.client.version.length;
  versionLength.writeUInt8(vLen, 0);

  const version = Buffer.alloc(vLen);
  Buffer.from(config.client.version).copy(version);

  const sequence = Buffer.alloc(config.packet.sequence);
  sequence.writeUInt32BE(Type, 0);

  const payloadLength = Buffer.alloc(config.packet.payloadLength);
  payloadLength.writeUInt32BE(payload.length, 0);

  return Buffer.concat([packetType, versionLength, version, sequence, payloadLength, payload]);
};
