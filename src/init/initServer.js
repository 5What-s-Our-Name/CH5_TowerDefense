import { formatDate } from '../utils/formatter/dateFormatter.js';
import { loadProtos } from './loadProto.js';

export const initServer = async () => {
  try {
    // 초기 설정
    await loadProtos();
  } catch (err) {
    const date = new Date();
    console.error(`[${formatDate(date)} - FAIL] Failed to initialize server`, err);
    process.exit(1);
  }
};
