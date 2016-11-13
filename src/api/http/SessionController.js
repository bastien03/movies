import { login, logout } from '../services/LoginService';
import { error } from './ErrorHandler';
import { asJson } from './RequestHeader';

export function loginRequest(req, res, next) {
  login(req, res, next,
    user => asJson(res).status(201).send(user),
    err => error(res, err)
  );
}

export function logoutRequest(req, res) {
  logout(req, res, () => res.status(204).send());
}
