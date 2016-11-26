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

    it('should GET all the movies with missing titles', (done) => {
      const movie1 = {
        title: { de: '', en: 't1', fr: '' }, year: 2000, url: 'u-1', director: 'd-1',
      };

      const movie2 = {
        title: { de: 't2', en: 't2', fr: 't2' }, year: 2000, url: 'u-2', director: 'd-2',
      };

      const req = chai.request(server).post('/api/movies');
      req.cookies = cookies;
      req.send(movie1)
        .end((err, res) => {
          res.should.have.status(201);

          const req2 = chai.request(server).post('/api/movies');
          req2.cookies = cookies;
          req2.send(movie2)
            .end((e, r) => {
              r.should.have.status(201);

              // only movie with uncompleted title translations
              // should be returned
              chai.request(server)
                .get('/api/movies?filter=MISSING_TITLE')
                .end((error, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('array');
                  response.body.length.should.be.eql(1);
                  expect(response.body[0].title.en).to.eql('t1');
                  done();
                });
            });
        });
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
            expect(createdMovie.title).to.eql({
              de: movie.title.de,
              en: movie.title.en,
              fr: movie.title.fr,
              default: movie.title.fr,
            });
            expect(createdMovie.year).to.eql(movie.year);
            expect(createdMovie.url).to.eql(movie.url);
            expect(createdMovie.director).to.eql(movie.director);
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
    });
  });

  describe('/PUT movies', () => {
    let movieId;

    // create one movie to be updated in the following tests.
    beforeEach((done) => {
      const movie = {
        title: {
          de: 'Titel',
          en: 'title',
          fr: 'titre',
        },
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
        title: {
          de: 'updated-Titel',
          en: 'updated-title',
          fr: 'updated-titre',
        },
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
            expect(createdMovie.title).to.eql({
              de: updateMovie.title.de,
              en: updateMovie.title.en,
              fr: updateMovie.title.fr,
              default: updateMovie.title.en,
            });
            expect(createdMovie.year).to.eql(updateMovie.year);
            expect(createdMovie.url).to.eql(updateMovie.url);
            expect(createdMovie.director).to.eql(updateMovie.director);

            done();
          });
      });

      it('should update multiple movies', (done) => {
        let movieId1;
        let movieId2;

        // create two movies
        const movie1 = {
          title: {
            de: 'Titel-1',
            en: 'title-1',
            fr: 'titre-1',
          },
          year: 1111,
          url: 'url-1',
          director: 'director-1',
        };
        const movie2 = {
          title: {
            de: 'Titel-2',
            en: 'title-2',
            fr: 'titre-2',
          },
          year: 2222,
          url: 'url-2',
          director: 'director-2',
        };

        const req1 = chai.request(server).post('/api/movies');
        req1.cookies = cookies;
        req1.send(movie1)
          .end((err1, res1) => {
            res1.should.have.status(201);
            movieId1 = res1.body.id;

            const req2 = chai.request(server).post('/api/movies');
            req2.cookies = cookies;
            req2.send(movie2)
              .end((err2, res2) => {
                res2.should.have.status(201);
                movieId2 = res2.body.id;

                // update the two movies
                const updateMovies = [
                  {
                    title: {
                      de: 'Titel-update-1',
                      en: 'title-update-1',
                      fr: 'titre-update-1',
                    },
                    year: 1100,
                    url: 'url-update-1',
                    director: 'director-update-1',
                    id: movieId1,
                  },
                  {
                    title: {
                      de: 'Titel-update-2',
                      en: 'title-update-2',
                      fr: 'titre-update-2',
                    },
                    year: 2200,
                    url: 'url-update-2',
                    director: 'director-update-2',
                    id: movieId2,
                  },
                ];
                const req3 = chai.request(server).put('/api/movies/bulk');
                req3.cookies = cookies;
                req3.send(updateMovies)
                  .end((err3, res3) => {
                    res3.should.have.status(200);

                    // check the movies have been updated
                    chai.request(server)
                      .get(`/api/movies/${movieId1}`)
                      .end((err4, res4) => {
                        res4.should.have.status(200);
                        res4.body.should.eql({
                          title: {
                            de: 'Titel-update-1',
                            en: 'title-update-1',
                            fr: 'titre-update-1',
                            default: 'title-update-1',
                          },
                          year: 1100,
                          url: 'url-update-1',
                          director: 'director-update-1',
                          id: movieId1,
                        });

                        chai.request(server)
                          .get(`/api/movies/${movieId2}`)
                          .end((err5, res5) => {
                            res5.should.have.status(200);
                            res5.body.should.eql({
                              title: {
                                de: 'Titel-update-2',
                                en: 'title-update-2',
                                fr: 'titre-update-2',
                                default: 'title-update-2',
                              },
                              year: 2200,
                              url: 'url-update-2',
                              director: 'director-update-2',
                              id: movieId2,
                            });
                            done();
                          });
                      });
                  });
              });
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
          title: {
            de: 'Titel',
            en: 'title',
            fr: 'titre',
          },
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
