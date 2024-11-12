### 유령 / 좀비 슬라임 스폰 현상 ( Nagle 알고리즘 )

#### 문제

- 간헐적으로 몬스터가 제대로 스폰되지 않거나 체력이 0인 상태의 슬라임이 삭제되지 않는 증상

![](https://velog.velcdn.com/images/r_louis/post/daca85fa-c82a-4b49-a321-250908948a1b/image.png)

#### 문제점 식별

- 로컬 환경에서는 정상적인 플레이가 가능했으나, EC2 환경에 올리고 무선환경에서 테스트 했을 때 간헐적으로 해당 증상이
  뜨는 것으로 문제 원인을 유추했을 때 패킷 유실에 대한 문제가 있다고 판단.
- 패킷처리 코드 부분을 console.log로 정밀 진단했으나, 인코딩, 디코딩 과정에는 문제가 없음.
- 초반부 테스트를 위한 Nagle 알고리즘 비활성화(`setNoDelay(true)`) 처리한 것이 문제
- 서버(네이글 비활성화) / 클라이언트(네이글 활성화) 로 인해 서버는 작은 패킷을 즉시 전송하지만, 클라이언트는 응답을
  보낼 때 지연이 발생해 비대칭적인 전송 속도로 인한 문제

![](https://velog.velcdn.com/images/r_louis/post/e02905e3-b284-43f2-a328-f7bfb2796319/image.png)

#### 해결책

- onConnection 이벤트 처리 함수 내 Nagle 알고리즘 비활성화 관련 코드 주석처리

#### 참고자료

[네이글 알고리즘에 대한 설명과 TCP_NODELAY](https://en.wikipedia.org/wiki/Nagle%27s_algorithm)
[Nagle's algorithm and Delayed ACKs](https://www.extrahop.com/blog/tcp-nodelay-nagle-quickack-best-practices#8-how-can-i-resolve-the-issues-caused-by-nagles-algorithm-and-delayed-acks)
[What is Nagle’s Algorithm?](https://www.ituonline.com/tech-definitions/what-is-nagles-algorithm/)
