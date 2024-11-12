### 클라이언트 값 조작 시 무한 타워 구매 현상

![](https://velog.velcdn.com/images/r_louis/post/3aafa108-d3be-453f-8787-608b0961586f/image.png)

#### 문제

- 값 변조 시 무한 타워설치 가능한 문제

#### 문제점 식별

- 기존 클라이언트 코드의 경우 서버를 거치지 않고 보유 금액에서 재화 구매 처리 후 x,y 좌표를 서버로 보내 id를 전달받아
  설치하는 방식이라 서버측에서 제어하지 못함.

![](https://velog.velcdn.com/images/r_louis/post/4654d967-dbba-424b-97b5-eef13716f6c3/image.png)
