### EC2 환경에서 loadHandlers() 작동 오류

![](https://velog.velcdn.com/images/r_louis/post/07390590-44fb-4617-888c-24395ccc9d55/image.png)

#### 문제

- 로컬 환경에서는 loadHandler() 작동에 문제가 없으나, EC2 환경에서 제대로 로드되지 않는 문제가 발생

#### 문제점 식별

- 윈도우 환경과 리눅스 환경의 path 구분 기준이 `\`, `/` 로 나뉘어 제대로 파싱하지 못하는 점을 파악

![](https://velog.velcdn.com/images/r_louis/post/6e382b9f-4ff8-4b80-96b8-d4038272f89d/image.png)

#### 해결책

- `path.basename`을 활용한 경로에서 바로 파일명 추출 후 확장자만 제거하는 식으로 변경
