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

  describe('/GET movies', () => {
    it('should GET all the movies', (done) => {
      chai.request(server)
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST movies', () => {
    let movie;

    beforeEach(() => {
      movie = {
        title: 'title',
        year: 2000,
        url: 'trailer-url',
        director: 'dir-ector',
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
      it('should create a movie', (done) => {
        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(201);
            const createdMovie = res.body;
            expect(createdMovie.id).to.not.be.null;
            expect(createdMovie.title).to.eql(movie.title);
            expect(createdMovie.year).to.eql(movie.year);
            expect(createdMovie.url).to.eql(movie.url);
            expect(createdMovie.director).to.eql(movie.director);
            done();
          });
      });

      it('should not create a movie without a title', (done) => {
        movie.title = undefined;
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
    });
  });

  describe('/PUT movies', () => {
    let movieId;

    // create one movie to be updated in the following tests.
    beforeEach((done) => {
      const movie = {
        title: 'title',
        year: 1987,
        url: 'url',
        director: 'director',
      };
      const req = chai.request(server).post('/api/movies');
      req.cookies = cookies;
      req.send(movie)
        .end((err, res) => {
          res.should.have.status(201);
          movieId = res.body.id;
          // expect(createdMovie.id).to.not.be.null;
          done();
        });
    });

    it('should not update a movie if user is not logged in', (done) => {
      chai.request(server)
        .put('/api/movies/movie-id')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('user is logged in', () => {
      const updateMovie = {
        title: 'updated-title',
        year: 2222,
        director: 'updated-director',
        url: 'updated-url',
      };

      it('should update a movie', (done) => {
        const req = chai.request(server).put(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.send(updateMovie)
          .end((err, res) => {
            res.should.have.status(200);
            const createdMovie = res.body;
            expect(createdMovie.id).to.eql(movieId);
            expect(createdMovie.title).to.eql(updateMovie.title);
            expect(createdMovie.year).to.eql(updateMovie.year);
            expect(createdMovie.url).to.eql(updateMovie.url);
            expect(createdMovie.director).to.eql(updateMovie.director);

            done();
          });
      });

      it('should not update a movie without a title', (done) => {
        updateMovie.title = undefined;
        const req = chai.request(server).put(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.send(updateMovie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not update a movie without a year', (done) => {
        updateMovie.year = undefined;
        const req = chai.request(server).put(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.send(updateMovie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not update a movie without a director', (done) => {
        updateMovie.director = undefined;
        const req = chai.request(server).put(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.send(updateMovie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('should not update a movie without a url', (done) => {
        updateMovie.url = undefined;
        const req = chai.request(server).put(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.send(updateMovie)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('/DELETE movies', () => {
    it('should not delete a movie if user is not logged in', (done) => {
      chai.request(server)
        .delete('/api/movies/movie-id')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('user is logged in', () => {
      let movieId;

      before((done) => {
        const movie = {
          title: 'movie-title',
          year: 1999,
          director: 'movie-director',
          url: 'movie-url',
        };

        const req = chai.request(server).post('/api/movies');
        req.cookies = cookies;
        req.send(movie)
          .end((err, res) => {
            res.should.have.status(201);
            const createdMovie = res.body;
            movieId = createdMovie.id;
            // expect(createdMovie.id).to.not.be.null;
            done();
          });
      });
      it('should delete a movie', (done) => {
        const req = chai.request(server).delete(`/api/movies/${movieId}`);
        req.cookies = cookies;
        req.end((err, res) => {
          res.should.have.status(204);
          done();
        });
      });

      it('should not delete a non existing movie', (done) => {
        const req = chai.request(server).delete('/api/movies/57108bbfa17e3eb0e846e787');
        req.cookies = cookies;
        req.end((err, res) => {
          res.should.have.status(204);
          done();
        });
      });
    });
  });
});
