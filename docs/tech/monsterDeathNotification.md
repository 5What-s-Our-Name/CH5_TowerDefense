# monsterDeathNotification

해당 함수는 몬스터 사망시 클라이언트에서 서버로 보낸 패킷의 payload의 monsterId를 가져와 서버의 monsterList에 저장된 monsterId를 확인 후, 그 몬스터가 가진 gold와 score를 반영해준 후, 상대편에게 몬스터 사망 알림 및 동기화 후, monsterList에서 해당 몬스터를 삭제하는 기능입니다.

## 1. monsterDeathNotification 함수

```js
const monsterDeathNotification = (socket, payload) => {
  try {
    const gameSession = getGameBySocket(socket);
    const { monsterId } = payload;
    const { user, opponent } = gameSession.getUsers(socket);
  } catch (error) {
    handleErr(socket, 1, error);
  }
};
```

패킷을 보낸 클라이언트의 socket과 payload를 가져와 getGameBySocket의 함수를 통해 socket으로 해당 클라이언트의 세션을 찾고, 그 세션 내의 유저와 상대를 정합니다.

그 후, payload로 보내진 monsterId를 지정 해줍니다.

monsterDeathNotification 함수에서 오류 발생시를 위한 try catch를 넣었습니다.

```js
opponent.socket.write(
  createResponse(PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION, opponent.getNextSequence(), {
    monsterId,
  }),
);
```

상대편에게 ENEMY_MONSTER_DEATH_NOTIFICATION 패킷으로 유저 쪽의 몬스터가 사망했다는 정보를 보냅니다.

```js
user.removeMonster(monsterId);
```

removeMonster 함수를 통해 유저가 잡은 몬스터의 보상 반영 및 삭제를 진행합니다.

## 2. removeMonster 함수

```js
removeMonster(monsterId = undefined) {
    if (monsterId === undefined && this.monsterList.length > 0) {
      this.monsterList.shift();
    } else if (this.monsterList.length > 0) {
      const index = this.monsterList.findIndex((monster) => monster.monsterId === monsterId);
      if (index !== -1) {
        const monster = this.monsterList.splice(index, 1)[0];
        if (monster) this.getMonsterSearchAndReward(monster); // 죽인 몬스터가 진짜 있을 경우
      }
    }
    this.sync();
  }
```

removeMonster 함수는 monsterDeathNotification 함수에 있는 monsterId를 가져와 undefined이고, monsterList.length가 0보다 크면 삭제만 진행,

monsterList.length가 0보다 크기만 하다면, monsterList에서 monsterId 확인 후, 제거 및 getMonsterSearchAndReward 함수를 통해 보상을 지급합니다.

## 3. getMonsterSearchAndReward 함수

```js
getMonsterSearchAndReward = (monster) => {
  const reward = monsterInfo[monster.monsterNumber - 1];
  this.gold += reward.gold;
  this.score += reward.score;
};
```

getMonsterSearchAndReward 함수는 유저가 보낸 monsterId에 해당하는 정보의 gold와 score를 지급하기 위한 함수입니다.
