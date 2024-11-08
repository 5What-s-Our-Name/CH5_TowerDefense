import {
  DB1_HOST,
  DB1_NAME,
  DB1_PASSWORD,
  DB1_PORT,
  DB1_USER,
  HOST,
  PEPPER,
  PORT,
  SALT,
  SECRET_KEY,
} from '../constants/env.js';
import {
  PACKET_PAYLOAD_LENGTH,
  PACKET_SEQUENCE,
  PACKET_TYPE_LENGTH,
  PACKET_VERSION_LENGTH,
} from '../constants/header.js';
import {
  BASE_HP,
  INIT_MONSTER_LEVEL,
  INIT_TOWER_COUNT,
  INITIAL_GOLD,
  MONSTER_SPAWN_INTERVAL,
  TOWER_COST,
} from '../constants/initGame.js';

export const config = {
  server: {
    host: HOST,
    port: PORT,
  },
  client: {
    version: '1.0.0',
  },
  packet: {
    typeLength: PACKET_TYPE_LENGTH,
    versionLength: PACKET_VERSION_LENGTH,
    sequence: PACKET_SEQUENCE,
    payloadLength: PACKET_PAYLOAD_LENGTH,
  },
  database: {
    USER_DB: {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
    },
  },
  auth: {
    pepper: PEPPER,
    salt: SALT,
    secret_key: SECRET_KEY,
  },
  init: {
    baseHp: BASE_HP,
    towerCost: TOWER_COST,
    initialGold: INITIAL_GOLD,
    monsterSpawnInterval: MONSTER_SPAWN_INTERVAL,
    monsterLevel: INIT_MONSTER_LEVEL,
    towerCount: INIT_TOWER_COUNT,
  },
};
