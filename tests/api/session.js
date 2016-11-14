import { getApp } from './root';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

let server;

describe('Session', () => {
  before(() => {
    server = getApp();
  });

  describe('/login', () => {
    it('should login', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ username: 'testUser', password: 'rez=56' })
        .end((err, res) => {
          res.should.have.status(201);
          // Save the cookie to use it later to retrieve the session
          const cookies = res.headers['set-cookie'].pop().split(';')[0];
          expect(cookies).to.not.be.null;
          done();
        });
    });

    it('should not login if username is missing', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ password: 'rez=56' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should not login if password is missing', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({ username: 'testUser' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/logout', () => {
    it('should logout', (done) => {
      chai.request(server)
        .delete('/api/logout')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
