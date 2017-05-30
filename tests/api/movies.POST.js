import { getCookies, getApp } from './root';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Movies', () => {
  let cookies;
  let server;

  before(() => {
    cookies = getCookies();
    server = getApp();
  });

  // ensure all movies created in the tests are deleted
  after((done) => {
    chai.request(server)
      .get('/api/movies')
      .end((err, res) => {
        res.should.have.status(200);
        const ids = [];
        res.body.forEach(movie => ids.push(movie.id));

        const deleteMovie = () => {
          if (ids.length === 0) {
            chai.request(server)
              .get('/api/movies')
              .end((getErr, getRes) => {
                getRes.should.have.status(200);
                getRes.body.should.be.a('array');
                getRes.body.length.should.be.eql(0);
                done();
              });
          } else {
            const movieId = ids[0];
            const req = chai.request(server).delete(`/api/movies/${movieId}`);
            req.cookies = cookies;
            req.end((deleteErr, deleteRes) => {
              deleteRes.should.have.status(204);
              ids.shift();
              deleteMovie();
            });
          }
        };

        deleteMovie();
      });
  });

  describe('/POST movies', () => {
    let movie;

    beforeEach(() => {
      movie = {
        title: {
          de: '',
          en: '',
          fr: 'titre',
        },
        year: 2000,
        url: 'trailer-url',
        director: 'dir-ector',
        country: 'FR',
        awards: [{ name: 'cannes', year: 2000 }],
      };
    });

    it('should not create a movie if user is not logged in', (done) => {
      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('user is logged in', () => {
      it('should create a movie without awards', (done) => {
        delete movie.awards;
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(201);
            const createdMovie = res.body;
            expect(createdMovie.id).to.not.be.null;
            expect(createdMovie.title).to.eql({
              de: movie.title.de,
              en: movie.title.en,
              fr: movie.title.fr,
              default: movie.title.fr,
            });
            expect(createdMovie.year).to.eql(movie.year);
            expect(createdMovie.url).to.eql(movie.url);
            expect(createdMovie.director).to.eql(movie.director);
            expect(createdMovie.country).to.eql(movie.country);
            expect(createdMovie.awards).to.eql([]);
            done();
          });
      });

      it('should create a movie with awards', (done) => {
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(201);
            const createdMovie = res.body;
            expect(createdMovie.id).to.not.be.null;
            expect(createdMovie.title).to.eql({
              de: movie.title.de,
              en: movie.title.en,
              fr: movie.title.fr,
              default: movie.title.fr,
            });
            expect(createdMovie.year).to.eql(movie.year);
            expect(createdMovie.url).to.eql(movie.url);
            expect(createdMovie.director).to.eql(movie.director);
            expect(createdMovie.country).to.eql(movie.country);
            expect(createdMovie.awards[0].name).to.eql(movie.awards[0].name);
            expect(createdMovie.awards[0].year).to.eql(movie.awards[0].year);
            done();
          });
      });

      it('should not create a movie without a title', (done) => {
        movie.title = {
          de: '',
          en: '',
          fr: '',
        };
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not create a movie without a year', (done) => {
        movie.year = undefined;
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not create a movie without a director', (done) => {
        movie.director = undefined;
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not create a movie without a url', (done) => {
        movie.url = undefined;
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not create a movie without a valid country', (done) => {
        movie.country = 'AA';
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });
});
