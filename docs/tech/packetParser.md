## packetParser

![](https://velog.velcdn.com/images/r_louis/post/675a1066-6c9c-4d86-b13b-1cdec6e6d11b/image.gif)

해당 함수는 소켓으로부터 수신된 바이너리 데이터를 안전하고 효율적으로 파싱합니다.
이 모듈을 통해 서버는 클라이언트로부터 수신된 다양한 요청을 정확하게 해석하고 처리할 수 있습니다.

## 코드 상세 설명

패킷 명세에 따른 타입 길이에 대한 내용은 config로 관리하고 있습니다.

| **필드 명**   | **타입** | **설명**              |
| ------------- | -------- | --------------------- |
| packetType    | ushort   | 패킷 타입 (2바이트)   |
| versionLength | ubyte    | 버전 길이 (1바이트)   |
| version       | string   | 버전 (유동)           |
| sequence      | uint32   | 패킷 번호 (4바이트)   |
| payloadLength | uint32   | 데이터 길이 (4바이트) |
| payload       | bytes    | 실제 데이터 (유동)    |

### 1. 패킷 타입 추출

```javascript
// packetType
if (socket.buffer.length < offset + config.packet.typeLength) return null;
const packetType = socket.buffer.readUInt16BE(offset);
offset += config.packet.typeLength;
```

버퍼에서 2바이트를 읽어 패킷의 타입을 결정합니다.
만약 버퍼에 충분한 데이터가 없다면 `null`을 반환하여 추가 데이터가 수신될 때까지 대기합니다.

### 2. 버전 길이 추출

```javascript
// versionLength
if (socket.buffer.length < offset + config.packet.versionLength) return null;
const versionLength = socket.buffer.readUInt8(offset);
offset += config.packet.versionLength;
```

버퍼에서 1바이트를 읽어 버전 문자열의 길이를 확인합니다.

### 3. 버전 문자열 추출

```javascript
// version
if (socket.buffer.length < offset + versionLength) return null;
const version = socket.buffer.slice(offset, offset + versionLength).toString();
offset += versionLength;
```

이전에 얻은 versionLength를 사용하여 버전을 추출합니다.

### 4. 시퀀스 번호 추출

```javascript
// sequence
if (socket.buffer.length < offset + config.packet.sequence) return null;
const sequence = socket.buffer.readUInt32BE(offset);
offset += config.packet.sequence;
```

4바이트를 읽어 패킷의 시퀀스 번호를 추출합니다.

### 5. 페이로드 길이 추출

```javascript
// payloadLength
if (socket.buffer.length < offset + config.packet.payloadLength) return null;
const payloadLength = socket.buffer.readUInt32BE(offset);
offset += config.packet.payloadLength;
```

4바이트를 읽어 페이로드의 길이를 추출합니다.

### 6. 페이로드 추출

```javascript
// payload
if (socket.buffer.length < offset + payloadLength) return null;
const payload = socket.buffer.slice(offset, offset + payloadLength);
offset += payloadLength;
```

지정된 payloadLength만큼 데이터를 추출하여 페이로드를 추출합니다.

### 7. 버퍼 업데이트

```javascript
// 남은 버퍼를 업데이트
socket.buffer = socket.buffer.slice(offset);
```

이미 처리된 부분을 버퍼에서 제거하여 다음 데이터 처리를 준비합니다.

### 8. 파싱 결과 반환

```javascript
// 실질적 사용할 것만 리턴
return {
  packetType,
  version,
  sequence,
  payload,
};
```

파싱된 데이터를 객체 형태로 반환합니다.

## 동작 흐름 요약

1. 버퍼에 수신된 데이터의 길이를 확인하고, 각 필드를 읽을 수 있는지 검사합니다.
2. 순차적으로 패킷의 헤더 정보를 파싱합니다.
3. 페이로드의 길이를 확인하고, 해당 길이만큼의 데이터를 추출합니다.
4. 사용된 버퍼 부분을 잘라내어 버퍼를 업데이트합니다.
5. 파싱된 결과를 반환하여 상위 로직에서 처리할 수 있도록 합니다.
