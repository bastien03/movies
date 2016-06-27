import request from 'superagent';
import uris from '../../../uris';

export const userLoggedIn = (user) => ({
  type: 'USER_LOGGED_IN',
  user,
});

export function login(credentials) {
  return (dispatch) => request
      .post(uris.loginApi())
      .set('Accept', 'application/json')
      .send(credentials)
      .end((err, res) => {
        const user = JSON.parse(res.text);
        dispatch(userLoggedIn(user));
      });
}
