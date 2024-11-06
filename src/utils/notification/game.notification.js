import { PACKET_TYPE } from '../../constants/header.js';

const makeNotification = (gameId, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(4);
  packetLength.writeUInt32BE(message.length + 1, 0); // 패킷 길이에 타입 바이트 포함

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(1);
  packetType.writeUInt8(type, 0);

  // 길이 정보와 메시지를 함께 전송
  // 현재는 gameId만 제공 중 입니다.
  // TODO: 명세서에 작성된 payload 형식으로 변경하기
  /*

    InitialGameState {
        int32 baseHp,
        int32 towerCost,
        int32 initialGold,
        int32 monsterSpawnInterval,
    }

    GameState {
        int32 gold,
        BaseData base,
        int32 highScore,
        repeated TowerData towers,
        repeated MonsterData monsters,
        int32 monsterLevel,
        int32 score,
        repeated Position monsterPath,
        Position basePosition,
    }

    S2CMatchStartNotification{
        InitialGameState initialGameState;
        GameState playerData;
        GameState opponentData;
    }
  */
  //return Buffer.concat([packetLength, packetType, gameId]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const Location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};

export const gameStartNotification = (gameId, timestamp) => {
  const protoMessages = getProtoMessages();
  const Start = protoMessages.gameNotification.Start;

  const payload = { gameId, timestamp };
  const message = Start.create(payload);
  const startPacket = Start.encode(message).finish();
  return makeNotification(startPacket, PACKET_TYPE.GAME_START);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return makeNotification(pingPacket, PACKET_TYPE.PING);
};
