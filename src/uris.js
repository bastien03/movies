const CONTEXT = process.env.APP_PATH || '/';
class Uris {

  constructor() {
    this.context = CONTEXT;
    this.uris = {};
  }

  linkTo(url) {
    return url ? this.context + url : this.context;
  }

  getContext() {
    return this.context;
  }

  setContext(context) {
    this.context = context;
  }

  /* eslint-disable no-multi-spaces, block-spacing, class-methods-use-this*/
  // pages
  moviesPage()        { return '/movies/:director';                 }
  loginPage()         { return '/login';                            }
  newMoviePage()      { return '/new-movie';                        }
  editMoviePage(id)   { return `edit/${id}`;                        }
  detailMoviePage(id) { return `detail/${id}`;                      }

  // API endpoints
  getAllMoviesApi()   { return this.linkTo('api/movies');          }
  getMovieApi(id)     { return this.linkTo(`api/movies/${id}`);     }
  addMovieApi()       { return this.linkTo('api/movies');           }
  deleteMovieApi(id)  { return this.linkTo(`api/movies/${id}`);     }
  editMovieApi(id)    { return this.linkTo(`api/movies/${id}`);     }
  loginApi()          { return this.linkTo('api/login');            }
  logoutApi()         { return this.linkTo('api/logout');           }
  /* eslint-disable */
}

const uris = new Uris();
export default uris;
