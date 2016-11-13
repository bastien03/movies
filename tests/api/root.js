process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const server = require('../../src/index');

let cookies;
export const getCookies = () => cookies;

export const getApp = () => server;

// root hook to be executed as very first
// it waits a few seconds that the server is ready
// and then logs in. The tests classes will be executed after the login
// succeeds.
// The retrieved cookie is exposed as function so that every test
// can retrieve it without having to login itself.
before(done => {
  setTimeout(() => {
    chai.request(server)
      .post('/api/login')
      .send({ username: 'testUser', password: 'rez=56' })
      .end((err, res) => {
        res.should.have.status(201);
        // Save the cookie to use it later to retrieve the session
        cookies = res.headers['set-cookie'].pop().split(';')[0];
        expect(cookies).to.not.be.null;
        done();
      });
  }, 3000);
});
