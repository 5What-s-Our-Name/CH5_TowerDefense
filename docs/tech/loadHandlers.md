## loadHandlers

해당 함수는 프로젝트의 확장성과 유지보수성을 높여줍니다.
새로운 핸들러를 추가할 때 별도의 로드 작업 없이 자동으로 인식되며, 코드를 간결하게 유지할 수 있습니다.

## 코드 상세 설명

### 1. 핸들러 디렉토리 설정

```javascript
const handlerDir = path.join(__dirname, '../handlers'); // 핸들러 디렉토리 경로 설정
```

현재 파일의 디렉토리에서 `../handlers` 경로를 결합하여 핸들러들이 위치한 디렉토리를 설정합니다.

### 2. 핸들러 파일 검색 함수 정의

```javascript
const getAllHandler = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllHandler(filePath, fileList); // 재귀 호출
    } else if (path.extname(file) === '.js') {
      fileList.push(filePath); // 핸들러 파일 경로를 배열에 추가
    }
  });

  return fileList;
};
```

지정된 디렉토리를 읽어 모든 파일과 폴더를 탐색합니다.
폴더가 발견되면 재귀적으로 getAllHandler를 호출하여 그 안의 파일들도 탐색합니다.
`.js` 확장자를 가진 파일들을 찾아 fileList 배열에 추가합니다.

### 3. 핸들러 파일 경로 목록 생성

```javascript
const handlersPath = getAllHandler(handlerDir);
```

getAllHandler에서 얻은 경로 리스트를 handlersPath 배열에 저장합니다.

### 4. 핸들러 로드 함수 정의

```javascript
export const loadHandlers = async () => {
  try {
    await Promise.all(
      handlersPath.map(async (file) => {
        const fileFullName = path.basename(file);
        const fileName = fileFullName.split('.')[0];
        const module = await import(pathToFileURL(file).href);

        if (module.default) {
          handlers[fileName] = module.default;
        } else {
          handlers[fileName] = module;
        }
      }),
    );

    const date = new Date();
    console.log(`[${formatDate(date)} - LOAD] Success to load Handler files`);
  } catch (err) {
    const date = new Date();
    console.error(`[${formatDate(date)} - FAIL] Fail to load Handler files`);
  }
};
```

handlersPath에 저장된 모든 파일을 비동기적으로 임포트합니다.
파일의 이름을 키로 하여 임포트된 모듈을 handlers 객체에 저장합니다.
모듈 export 방식에 따라 저장합니다. (현재 코드베이스 내 핸들러는 default로 export 하고 있습니다.)

### 5. getHandlers

```javascript
export const getHandlers = () => {
  return handlers;
};
```

외부에서 handlers 객체에 접근할 수 있도록 반환하는 함수를 제공합니다.

## 동작 흐름 요약

1. **핸들러 파일 수집**: 지정된 디렉토리에서 모든 `.js` 핸들러 파일의 경로를 수집합니다.
2. **핸들러 로드**: 수집된 경로들을 순회하며 모듈을 동적으로 임포트하고 handlers 객체에 저장합니다.
3. **핸들러 제공**: 다른 모듈에서 `getHandlers` 함수를 통해 로드된 핸들러에 접근할 수 있습니다.
