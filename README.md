![image](https://github.com/user-attachments/assets/56bba555-b861-4f4e-ac27-a7590b8671fd)



## CH5_TowerDefense
CH5 온라인 멀티플레이 타워디펜스 게임 서버

### 소개
이 프로젝트는 TCP 소켓 통신을 기반으로 한 온라인 멀티플레이어 타워디펜스 게임 서버입니다. Node.js와 프로토콜 버퍼(Protobuf)를 사용하여 클라이언트와 효율적인 통신을 구현하였습니다.

### 주요 기능
- 회원가입 및 로그인: 유저는 회원가입 후 로그인하여 게임에 참여할 수 있습니다.
- 매칭 시스템: 다른 유저와 실시간으로 매칭되어 대전을 진행합니다.
- 타워 배치 및 업그레이드: 게임 내에서 타워를 구매하고 전략적으로 배치할 수 있습니다.
- 몬스터 생성 및 공격: 상대방에게 몬스터를 보내 공격할 수 있습니다.
- 실시간 상태 동기화: 게임 진행 상황이 실시간으로 동기화됩니다.
- 게임 결과 처리: 게임 종료 후 결과를 처리하고 점수를 저장합니다.

### 설치 및 실행 방법
1. 프로젝트 클론
```git clone https://github.com/yourusername/CH5_TowerDefense.git```
2. 디렉토리 이동 및 의존성 설치
```
cd CH5_TowerDefense
npm install
```
3. 환경 변수 설정

`.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

4. 데이터베이스 설정

- MySQL 데이터베이스를 설치합니다.
- `config.js`에서 데이터베이스 설정을 수정합니다.
- 데이터베이스 마이그레이션 실행:
  ```
  npm run migrate
  ```

5. 서버 실행
```
npm run dev
```

### 폴더 구조
- `src` - 소스 코드 디렉토리
- `classes/models/` - 주요 클래스 정의
- `constants/` - 상수 정의
- `handlers/` - 패킷 핸들러 모음
- `init/` - 초기화 스크립트
- `mysql/` - 데이터베이스 연결 및 설정
- `sessions/` - 세션 관리
- `utils/` - 유틸리티 함수
- `protobuf/` - 프로토콜 버퍼 정의

### 주요 파일 설명
- `server.js` - 서버 시작점
- `initServer.js` - 서버 초기화 로직
- `handlers` - 클라이언트 요청 처리 핸들러
- `sessions` - 유저 및 게임 세션 관리
- `models` - 게임 데이터 및 유저 클래스 정의

### 패킷 및 프로토콜
- `프로토콜 버퍼`를 사용하여 클라이언트와 통신합니다.
- 패킷 타입은 `header.js`에 정의되어 있습니다.
- 프로토콜 정의는 `packet.proto`에 있습니다.

### 게임세션 자동 증설 및 자동 감소
![image](https://github.com/user-attachments/assets/8cf3cabf-ced1-43c8-b0f0-538e06154300)

유저가 게임 매칭을 시도하면, 먼저 유저 세션에서 해당 유저 정보를 가져옵니다.<br>
그리고 현재 유저가 1명만 있는 게임 세션을 찾습니다. <br>
만약 그런 세션이 없다면 새로운 방을 생성해 유저를 배치하고, <br>
이미 존재한다면 해당 방에 유저를 추가해 매칭시킵니다.<br>

### 핸들러 폴더 내 함수 자동 파싱 및 연동
![image](https://github.com/user-attachments/assets/14575ed0-4113-423c-b6d9-d5363d10bfe9)

들어온 패킷 번호를 바탕으로 패킷 이름을 추출하고, 그 이름과 동일한 함수를 Handlers 객체에서 찾아서 연동합니다.<br>
