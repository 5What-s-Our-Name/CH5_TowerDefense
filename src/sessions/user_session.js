import { userSessions } from './session.js';
import User from '../classes/models/user_class.js';

// 유저 객체를 유저 세션에 추가
export const addUser = (socket, token) => {
  const user = new User(socket, token);
  console.log('userSession_user: ', user);
  //token은 User Class에 의해 userId가 될 겁니다.
  //그래서 토큰을 비교해야한다면 userId로 비교하세요
  userSessions.push(user);
  return user;
};

export const getUserByUserId = (userId) => {
  return userSessions.find((user) => user.userId === userId);
};

export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index != -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserBySocket = (socket) => {
  const user = userSessions.find((user) => user.socket === socket);
  if (!user) {
    console.error('User not found : getUserBySocket');
  }
  return user;
};

export const getUserSessions = () => {
  return userSessions;
};
