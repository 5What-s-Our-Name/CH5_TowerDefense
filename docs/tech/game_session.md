## 게임 세션 자동 증감

`game_session.js` 내 `getGameSession`,`exitGameSession` 함수와
`create_game_sessiong.js` 내 `createGameSession`으로 유저 수에 따라 세션이 자동으로 증가하고 감소하는 메커니즘을 구현하였습니다.

![image](https://github.com/user-attachments/assets/67bc99b3-3ce7-4c4a-9ba3-52c0076fe32d)


## 1.getGameSession

```javascript
export const getGameSession = () => {
  const sessions = gameSessions
    .map((session) => {
      const userCnt = session.getUserCount();
      return userCnt < MAX_PLAYERS ? [session, userCnt] : null;
    })
    .filter(Boolean);

  if (sessions.length === 0) {
    // 참여 가능한 세션이 없으면 새로운 게임 세션 생성
    createGameSession();
    return gameSessions[gameSessions.length - 1];
    // 마지막으로 생성된 세션 반환
  }

  sessions.sort((a, b) => a[1] - b[1]);

  return sessions[0][0]; // 가장 적은 사용자 수가 있는 세션 반환
};
```

현재 참여 가능한 게임 세션을 찾아서 반환하는 함수입니다.
gameSessions 객체에서 각 세션의 현재 사용자 수를 확인합니다.
MAX_PLAYERS(현재 2명) 보다 작은 세션만 `[session, userCnt]` 형태로 배열에 저장하고, 그렇지 않으면 `null`을 저장합니다.

그다음 filter(Boolean)을 사용하여 `null` 값을 제거하여 참여 가능한 세션만 남깁니다.
만약 참여 가능한 세션이 없다면 `createGameSession()` 함수를 호출하여 새로운 게임 세션을 생성합니다.
그 후 gameSessions 배열에 추가된 최근 생성된 세션을 반환합니다.

만약 참여 가능한 세션이 있다면 사용자 수를 기준으로 오름차순 정렬합니다.
가장 적은 사용자 수를 가진 세션을 반환합니다.

## 2. createGameSession

```javascript
export const createGameSession = () => {
  const gameId = uuidV4();
  // 게임 세션 아이디는 UUID를 활용하여 생성
  const createdGameSession = addGameSession(gameId);
  if (createdGameSession) {
    console.log(`[GAME_SESSION] Game session successfully created. - ${createdGameSession.gameId}`);
  } else {
    console.log(`[FAIL] Failed to create game session`);
  }
};
```

새로운 게임 세션을 생성하고 세션 리스트에 추가하는 함수입니다.
uuidV4()를 사용하여 고유한 gameId를 생성하고 addGameSession(gameId)를 호출하여 새로운 Game 인스턴스를 생성하고 gameSessions 객체에 추가합니다.
생성된 세션이 성공적으로 추가되었는지 확인하고 로그를 출력합니다.

## 3. exitGameSession

```javascript
export const exitGameSession = (socket) => {
  const gameSession = getGameBySocket(socket);
  if (!gameSession) return;
  gameSession.removeUser(socket);
  if (gameSession.getUserCount() === 0) {
    removeGameSession(gameSession.gameId);
  }
};
```

유저가 게임 세션에서 나갈 때 해당 세션에서 유저를 제거하고, 그 후 세션이 비어 있으면 세션을 삭제하는 함수입니다.
`getGameBySocket(socket)`을 통해 현재 유저가 속한 게임 세션을 찾습니다.

해당 세션에서 gameSession.removeUser(socket)을 호출하여 유저를 제거합니다.
그 후 세션의 남은 유저 수를 확인하여 만약 유저 수가 0명이면
removeGameSession(gameSession.gameId)을 호출하여 세션을 삭제합니다.
