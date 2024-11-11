import { getHandlers } from '../../init/loadHandlers.js';
import { snakeToCamel } from '../formatter/snakeToCamel.js';

// 클라이언트 시퀀스 관리
const clientSequences = new Map();
// 클라이언트 시퀀스 대기열
const clientWaitingQueue = new Map();

export function handleIncomingPacket(clientId, packet) {
  const currentSequence = packet.sequence;
  const lastSequence = clientSequences.get(clientId) || 0;

  if (currentSequence === lastSequence + 1) {
    clientSequences.set(clientId, currentSequence);
    processPacket(packet);

    // 대기열에서 연속된 패킷 처리
    const queue = clientWaitingQueue.get(clientId) || [];

    // 대기열에 넣을 때 정렬하기 때문에 0번 인덱스로 비교.
    while (queue.length > 0 && queue[0].sequence === clientSequences.get(clientId) + 1) {
      const nextPacket = queue.shift();
      clientSequences.set(clientId, nextPacket.sequence);
      processPacket(nextPacket.packet);
    }
  } else if (currentSequence > lastSequence + 1) {
    console.warn('패킷 누락');
    if (!clientWaitingQueue.has(clientId)) clientWaitingQueue.set(clientId, []);
    const queue = clientWaitingQueue.get(clientId);

    if (!queue.some((q) => q.sequence === currentSequence)) {
      queue.push({ sequence: currentSequence, packet });
      queue.sort((a, b) => a.sequence - b.sequence); // 시퀀스 순서대로 정렬
      clientWaitingQueue.set(clientId, queue);
    }
    requestMissingPacket(clientId, lastSequence + 1);
  } else {
    console.log(`패킷 중복`);
  }
}

function requestMissingPacket(clientId, Sequence) {
  console.log('재전송 요청');
  // 실제로 클라이언트에 재전송 요청을 보내는 로직을 구현
}

function processPacket(packet) {
  const { packetType, payload } = packet;
  const payloadName = snakeToCamel(PACKET_TYPE_REVERSED[packetType]);
  const handlers = getHandlers();
  const handler = handlers[payloadName];
  const decodedPayload = { ...GamePacket.decode(payload)[payloadName] };
  handler(socket, decodedPayload);
}
