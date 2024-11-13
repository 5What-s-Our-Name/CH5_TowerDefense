<a href="https://github.com/nodejs/node"><img src="https://img.shields.io/badge/node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" /></a> 	<a href="https://github.com/protocolbuffers/protobuf"><img src="https://img.shields.io/badge/buffer-%23231F20.svg?&style=for-the-badge&logo=buffer&logoColor=white" /></a> <a href="https://github.com/sidorares/node-mysql2"><img src="https://img.shields.io/badge/mysql-%234479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white" /></a> <a href="https://github.com/auth0/node-jsonwebtoken"><img src="https://img.shields.io/badge/json%20web%20tokens-%23000000.svg?&style=for-the-badge&logo=json%20web%20tokens&logoColor=white" /></a> <a href="https://github.com/dustinrouillard/snowflake-id"><img src="https://img.shields.io/badge/snowflake-%2356B9EB.svg?&style=for-the-badge&logo=snowflake&logoColor=black" /></a>

## TowerDefense

### 소개
----------
이 프로젝트는 TCP 소켓 통신과 Protocol Buffers(ProtoBuf)를 학습하기 위해 시작되었습니다. <br>Node.js의 net 모듈을 사용하여 패킷 통신을 구현하였으며, 효율적인 데이터 전송을 위해 프로토콜 버퍼를 채택하여 클라이언트와의 패킷 통신을 처리하였습니다.<br>

하드코딩을 최소화하고 자동화를 높이기 위해 패킷명과 핸들러 이름을 동일하게 설정하여, 패킷의 페이로드 디코딩부터 핸들러 연동까지 자동으로 설정되도록 설계하였습니다.<br> 또한, 세션 관리 측면에서는 인원 수에 따라 세션을 자동으로 증설 및 감축하도록 구현하였습니다.

### 프로젝트 코드 플로우
------------------------
![image](https://github.com/user-attachments/assets/4036be92-8e15-4962-8a53-2e117ff41fec)

### 시연영상
-----------------------

https://github.com/user-attachments/assets/3b3e1679-2d40-41e4-b95e-1813558eeb3f



### 주요 기능
------------
- [`패킷 파싱`](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/tech/packetParser.md) : 크기가 유동적인 패킷을 버퍼에서 원활하게 파싱하기 위하여 오프셋 개념을 이용 하였습니다.
- [`핸들러 폴더 내 함수 자동 파싱 및 연동`](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/tech/loadHandlers.md) : 패킷 타입을 바탕으로 패킷 이름을 추출하고, 그 이름과 동일한 함수를 Handlers 객체에서 찾아서 연동합니다.
- [`게임세션 자동 증설 및 자동 감소`](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/tech/game_session.md) : 유저 접속에 따라 게임 세션이 유동적으로 생성 및 감소합니다.
- `회원가입 및 로그인`: 유저는 회원가입 후 로그인하여 게임에 참여할 수 있습니다.
- `매칭 시스템` : 다른 유저와 실시간으로 매칭 및 대전을 진행합니다.
- `타워 배치 및 업그레이드`: 게임 내에서 타워를 구매할 수 있으며 랜덤한 위치에 배치되어 재미요소를 더했습니다.
- `몬스터 생성 및 공격`: 몬스터는 총 5가지로 랜덤하게 스폰되며, BASE에 도달 시 정해진 데미지를 가격합니다.
- `실시간 상태 동기화`: 게임 진행 상황이 실시간으로 동기화되며, 몬스터 및 타워의 상태 변화가 있다면 동기화를 추가로 진행합니다.
- `게임 결과 처리`: 게임 종료 후 승패 여부를 패킷으로 전송하고 점수를 DB와 비교하여 높을 시 저장합니다.

### TROUBLE-SHOOTING
--------------------
- [Problem_1] [EC2 환경에서 loadHandlers() 작동 오류](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/troubleShooting/loadHandlers.md)
- [Problem_2] [클라이언트 값 조작 시 무한 타워 구매 현상](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/troubleShooting/towerPurchase.md)
- [Problem_3] [유령 / 좀비 슬라임 스폰 현상 ( Nagle 알고리즘 )](https://github.com/5What-s-Our-Name/TowerDefense/blob/dev/docs/troubleShooting/onConnection.md)

### 기술 스택
----------------
- `Node.js`: 자바스크립트 기반의 런타임 환경으로, 서버 사이드 애플리케이션을 개발하는 데 사용되었습니다.
- `TCP 소켓 통신`: net 모듈을 활용하여 TCP 소켓 서버를 구축하고, 클라이언트와의 실시간 통신을 구현했습니다.
- `Protocol Buffer`: 효율적인 바이너리 통신을 위해 protobufjs 라이브러리를 사용했습니다.
- `Buffer`: 네트워크 통신에서 이진 데이터를 효율적으로 처리하기 위해 Node.js의 Buffer 클래스를 활용했습니다.
- `MySQL 데이터베이스`: mysql2/promise 모듈을 사용하여 MySQL Connection Pool을 구현했습니다.
- `bcrypt`: 비밀번호 해싱을 통해 보안을 강화하기 위해 bcrypt 라이브러리를 사용했습니다.
- `JWT (JSON Web Token)`: 사용자 인증과 세션 관리를 위해 jsonwebtoken을 사용하여 토큰 기반 인증을 구현했습니다.
- `Joi`: 입력 값의 유효성 검사를 위해 joi 라이브러리를 사용했습니다.
- `UUID`: 각 세션ID를 고유하게 식별하기 위해 uuid 모듈을 활용했습니다.
- `SnowFlake`: monsterId, towerId의 고유번호를 위하여 SnowFlake를 활용하여 Int형 uuid 커스텀 함수를 만들어 사용하였습니다.
- `Custom Error Handle`: 에러 처리를 일관성 있게 관리하기 위해 CustomErr 클래스를 정의하고 활용했습니다.
- `환경 변수 관리`: dotenv 라이브러리를 통해 중요한 설정 값들을 환경 변수로 관리하고 보안을 강화했습니다.


### 실행 간 참고사항
#### 1. 환경 변수 설정
`.env` 파일을 생성하고 필요한 환경 변수를 설정합니다. (내용 하단 참고)
```
##########SERVER##########
PORT = 서버포트
HOST = 서버주소
##########MYSQL##########
DB1_NAME = DB명
DB1_USER = DB계정명
DB1_PASSWORD = DB패스워드
DB1_HOST = DB주소
DB1_PORT = DB포트
##########AUTH##########
PEPPER = PEPPERVALUE
SALT = 10 // SALT값
SECRET_KEY = SECRETKEY
```

#### 2. 데이터베이스 설정
- DB 준비 후 마이그레이션 진행
`src\mysql\migration` 폴더 내 `createSchemas.js` 실행 시 DB 마이그레이션 진행
- 또는 package.json에 적힌 `migrate` 사용 `npm run migrate`

### 폴더 구조
```
📦src
 ┣ 📂assets
 ┃ ┣ 📜init.js
 ┃ ┗ 📜monster.js
 ┣ 📂classes
 ┃ ┗ 📂models
 ┃ ┃ ┣ 📜gameData_class.js
 ┃ ┃ ┣ 📜game_class.js
 ┃ ┃ ┗ 📜user_class.js
 ┣ 📂config
 ┃ ┗ 📜config.js
 ┣ 📂constants
 ┃ ┣ 📜env.js
 ┃ ┣ 📜header.js
 ┃ ┣ 📜initGame.js
 ┃ ┗ 📜sessions.js
 ┣ 📂events
 ┃ ┣ 📜onConnection.js
 ┃ ┣ 📜onData.js
 ┃ ┣ 📜onEnd.js
 ┃ ┗ 📜onError.js
 ┣ 📂handlers
 ┃ ┣ 📂game
 ┃ ┃ ┣ 📜gameEndRequest.js
 ┃ ┃ ┗ 📜matchRequest.js
 ┃ ┣ 📂monster
 ┃ ┃ ┣ 📜monsterAttackBaseRequest.js
 ┃ ┃ ┣ 📜monsterDeathNotification.js
 ┃ ┃ ┗ 📜spawnMonsterRequest.js
 ┃ ┣ 📂tower
 ┃ ┃ ┣ 📜towerAttackRequest.js
 ┃ ┃ ┗ 📜towerPurchaseRequest.js
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜loginRequest.js
 ┃ ┃ ┗ 📜registerRequest.js
 ┣ 📂init
 ┃ ┣ 📜initServer.js
 ┃ ┣ 📜loadHandlers.js
 ┃ ┗ 📜loadProto.js
 ┣ 📂mysql
 ┃ ┣ 📂migration
 ┃ ┃ ┗ 📜createSchemas.js
 ┃ ┣ 📂sql
 ┃ ┃ ┗ 📜user_db.sql
 ┃ ┣ 📜createPool.js
 ┃ ┗ 📜testDataBase.js
 ┣ 📂protobuf
 ┃ ┗ 📜packet.proto
 ┣ 📂sessions
 ┃ ┣ 📜game_session.js
 ┃ ┣ 📜session.js
 ┃ ┗ 📜user_session.js
 ┣ 📂utils
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜customErr.js
 ┃ ┃ ┣ 📜errCodes.js
 ┃ ┃ ┗ 📜handlerErr.js
 ┃ ┣ 📂formatter
 ┃ ┃ ┣ 📜dateFormatter.js
 ┃ ┃ ┣ 📜s2cConvert.js
 ┃ ┃ ┗ 📜snakeToCamel.js
 ┃ ┣ 📂function
 ┃ ┃ ┗ 📂game
 ┃ ┃ ┃ ┣ 📜create_game_session.js
 ┃ ┃ ┃ ┗ 📜join_game_session.js
 ┃ ┣ 📂game
 ┃ ┃ ┣ 📜copyInstance.js
 ┃ ┃ ┣ 📜initHighScore.js
 ┃ ┃ ┣ 📜isLogin.js
 ┃ ┃ ┣ 📜makeInitPath.js
 ┃ ┃ ┣ 📜makeInitTower.js
 ┃ ┃ ┗ 📜score.js
 ┃ ┣ 📂joi
 ┃ ┃ ┗ 📜validateSignUp.js
 ┃ ┣ 📂jwt
 ┃ ┃ ┣ 📜createToken.js
 ┃ ┃ ┗ 📜decodeToken.js
 ┃ ┣ 📂parser
 ┃ ┃ ┗ 📜packetParser.js
 ┃ ┣ 📂response
 ┃ ┃ ┗ 📜createResponse.js
 ┃ ┣ 📂sequence
 ┃ ┃ ┗ 📜C2SSequence.js
 ┃ ┗ 📂util
 ┃ ┃ ┣ 📜delay.js
 ┃ ┃ ┗ 📜uuid.js
 ┗ 📜server.js
```
