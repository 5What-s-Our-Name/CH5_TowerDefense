import { userSessions } from './session.js';
import User from '../classes/models/user_class.js';

// 유저 객체를 유저 세션에 추가
export const addUser = (socket, token) => {
  const user = new User(socket, token);
  userSessions.set(socket.name, user);
  return user;
};

export const getUserByUserId = (userId) => {
  for (const user of userSessions.values()) {
    if (user.userId === userId) {
      return user;
    }
  }
};

export const removeUser = async (socket) => {
  const user = userSessions.get(socket.name);
  if (user) {
    userSessions.delete(socket.name);
    return user;
  }
};

export const getUserBySocket = (socket) => {
  const user = userSessions.get(socket.name);
  if (!user) {
    console.error('User not found : getUserBySocket');
  }
  return user;
};

export const getUserSessions = () => {
  return [...userSessions.values()];
};
