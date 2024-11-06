import { PACKET_TYPE } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { v4 as uuidV4 } from 'uuid';
const spawnMonsterRequest = (socket, sequence, payload) => {
  const uuid = uuidV4();
  const response = createResponse(PACKET_TYPE.SPAWN_MONSTER_RESPONSE, sequence, {
    monsterId: uuid,
    monsterNumber: 1,
  });
  socket.write(response);
};

export default spawnMonsterRequest;
