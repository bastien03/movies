import User from '../../src/api/domain/User';

process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../src/index');

chai.should();
chai.use(chaiHttp);

new User({ username: 'bastien' }).save();

describe('Session', () => {
  describe('/login', () => {
    it('should login', done => {
      chai.request(server)
        .post('/api/login')
        .send({ username: 'bastien', password: 'rez=56' })
        .end((err, res) => {
          res.should.have.status(201);
          // Save the cookie to use it later to retrieve the session
          const cookies = res.headers['set-cookie'].pop().split(';')[0];
          expect(cookies).to.not.be.null;
          done();
        });
    });

    it('should not login if username is missing', done => {
      chai.request(server)
        .post('/api/login')
        .send({ password: 'rez=56' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should not login if password is missing', done => {
      chai.request(server)
        .post('/api/login')
        .send({ username: 'bastien' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/logout', () => {
    it('should logout', done => {
      chai.request(server)
        .delete('/api/logout')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
