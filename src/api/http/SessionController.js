import { COOKIE_NAME, login } from '../authenticationManager';
// import { login } from '../services/LoginService';

const error = (res, err) => {
  console.error('Error:', err);
  if (err === 'DTO_VALIDATION') {
    return res.status(400).send('Input data not valid.');
  }
  return res.status(500).send('Something wrong happend. Please try again later.');
};

export function loginRequest(req, res, next) {
  // return login(req, res, next)
  //   .then(user => res.status(201).send(user))
  //   .catch(err => { console.error('catch', err); error(res, err); });
  return login(req, res, next);
}

export function logoutRequest(req, res) {
  req.logout();
  res.clearCookie(COOKIE_NAME);
  res.status(204).send();
}
