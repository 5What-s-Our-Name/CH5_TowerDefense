import { config } from '../../config/config.js';
import { getProtoMessages } from '../../init/loadProto.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import CustomErr from '../error/customErr';
import { errCodes } from '../error/errCodes.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();
  // 공통 패킷
  const Packet = protoMessages.common.CommonPacket;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (err) {
    throw new CustomErr(errCodes.PACKET_DECODE_ERR, 'Failed to decode packet');
  }

  const { handlerId, userId, version } = packet;

  if (version !== config.client.version) {
    throw new CustomErr(errCodes.CLIENT_VERSION_MISMATCH, 'Client version mismatch');
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new CustomErr(errCodes.UNKNOWN_HANDLER_ID, 'Unknown handler ID');
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = payloadType.decode(packet.payload);
  } catch (err) {
    throw new CustomErr(errCodes.PACKET_DECODE_ERR, 'Failed to decode packet');
  }
  const expectedFields = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

  if (missingFields.length > 0) {
    throw new CustomErr(errCodes.MISSING_FIELDS, 'Field is missing');
  }

  return { handlerId, userId, payload };
};
