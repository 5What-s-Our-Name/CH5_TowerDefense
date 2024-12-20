import { config } from '../../config/config.js';
import { PACKET_TYPE_REVERSED } from '../../constants/header.js';
import { GamePacket } from '../../init/loadProto.js';
import { snakeToCamel } from './../formatter/snakeToCamel.js';

export const createResponse = (Type, seq, data = null, failCode = 0) => {
  const typeName = PACKET_TYPE_REVERSED[Type];
  const camel = snakeToCamel(typeName);

  const response = {
    [camel]: data,
  };

  const payload = GamePacket.encode(response).finish();

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt16BE(Type, 0);

  const versionLength = Buffer.alloc(config.packet.versionLength);
  const vLen = config.client.version.length;
  versionLength.writeUInt8(vLen, 0);

  const version = Buffer.alloc(vLen);
  Buffer.from(config.client.version).copy(version);

  const sequence = Buffer.alloc(config.packet.sequence);
  sequence.writeUInt32BE(seq++, 0);

  const payloadLength = Buffer.alloc(config.packet.payloadLength);
  payloadLength.writeUInt32BE(payload.length, 0);

  return Buffer.concat([packetType, versionLength, version, sequence, payloadLength, payload]);
};
