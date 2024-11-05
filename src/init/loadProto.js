import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { formatDate } from '../utils/formatter/dateFormatter.js';

// 현재 파일의 경로와 디렉토리를 가져옴
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, '../protobuf'); // .proto 파일들이 있는 디렉토리 경로 설정

// 주어진 디렉토리에서 .proto 파일을 재귀적으로 검색하여 파일 목록 반환
const getAllProto = (dir, fileList = []) => {
  const files = fs.readdirSync(dir); // 주어진 디렉토리 내 모든 파일과 폴더 목록 읽기
  files.forEach((file) => {
    const filePath = path.join(dir, file);

    // 하위 디렉토리가 있으면 재귀적으로 호출하여 .proto 파일 검색
    if (fs.statSync(filePath).isDirectory()) {
      getAllProto(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath); // .proto 파일 경로를 fileList 배열에 추가
    }
  });

  return fileList; // 모든 .proto 파일의 경로 목록 반환
};

// .proto 파일 목록 가져오기
const protoFiles = getAllProto(protoDir);

let root;
const protoMessages = {};

export let GamePacket;
export let GlobalFailCode;

// 모든 .proto 파일을 비동기적으로 로드하여 메시지를 protoMessages 객체에 저장
export const loadProtos = async () => {
  try {
    root = new protobuf.Root(); // 프로토콜 버퍼의 루트 객체 생성

    // 모든 .proto 파일을 로드하여 병합
    await Promise.all(protoFiles.map((file) => root.load(file)));
    getTypes(root);
    GamePacket = root.lookupType('GamePacket');
    GlobalFailCode = root.lookupEnum('GlobalFailCode');

    const date = new Date();
    console.log(`[${formatDate(date)} - LOAD] Success to load protobuf files`);
  } catch (err) {
    const date = new Date();
    console.error(`[${formatDate(date)} - FAIL] Fail to load protobuf files`);
  }
};

function getTypes(root, prefix = '') {
  Object.keys(root.nested).forEach((key) => {
    const nestedObject = root.nested[key];
    const fullName = prefix ? `${prefix}.${key}` : key;

    if (nestedObject.nested) {
      // 패키지인 경우 재귀적으로 탐색
      getTypes(nestedObject, fullName);
    } else if (nestedObject instanceof protobuf.Type) {
      // 메시지 타입일 경우만 저장
      const [packageName, type] = fullName.split('.');

      // 패키지 이름이 이미 존재하지 않으면 객체 초기화
      if (!protoMessages[packageName]) protoMessages[packageName] = {};

      // 메시지 타입을 protoMessages 객체에 저장
      protoMessages[packageName][type] = root.lookupType(fullName);
    }
  });
}

export const getProtoMessages = () => {
  return { ...protoMessages };
};
