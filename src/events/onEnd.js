export const onEnd = (socket) => () => {
  // 소켓 종료 시 수행해야 할 함수 추가
  console.log('Client Disconnected');
};
