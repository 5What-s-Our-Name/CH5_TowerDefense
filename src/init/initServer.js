import { testAllConnections } from '../mysql/testDataBase.js';
import { formatDate } from '../utils/formatter/dateFormatter.js';
import { loadHandlers } from './loadHandlers.js';
import { loadProtos } from './loadProto.js';
import pools from './../mysql/createPool.js';

export const initServer = async () => {
  try {
    // 초기 설정
    await testAllConnections(pools);
    await loadProtos();
    await loadHandlers();
  } catch (err) {
    const date = new Date();
    console.error(`[${formatDate(date)} - FAIL] Failed to initialize server`, err);
    process.exit(1);
  }
};
