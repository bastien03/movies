import { login as authLogin, logout as authLogout } from '../authenticationManager';
import UserRepository from '../repositories/UserRepository';

export const login = (req, res, next, successCallback, errorCallback) => {
  const { username, password } = req.body;

  if (!username || !password) {
    errorCallback('DTO_VALIDATION');
  } else {
    authLogin(req, res, next, successCallback, errorCallback);
  }
};

export const logout = (req, res, successCallback) => {
  authLogout(req, res, successCallback);
};

export const getUserByUserName = userName => UserRepository.findByName(userName);
export const getUserById = userName => UserRepository.findById(userName);
