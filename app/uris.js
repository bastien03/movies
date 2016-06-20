const CONTEXT = process.env.APP_PATH || '/';
class Uris {

  constructor() {
      this.context = CONTEXT;
      this.uris = {};
  }

  linkTo(url) {
      if (url) {
          return this.context + url;
      }

      return this.context;
  }

  getContext() {
    return this.context;
  }

  setContext(context) {
    this.context = context;
  }

  // pages
  indexPage()        {return '/'                                }
  loginPage()        {return '/login'                            }
  newMoviePage()     {return '/new-movie'                        }
  editMoviePage(id)  {return this.linkTo('edit/' + id)          }

  // API endpoints
  getMovieApi(id)    {return this.linkTo('api/movies/' + id)    }
  addMovieApi()      {return '/api/movies'                      }
  deleteMovieApi(id) {return this.linkTo('api/movies/' + id)    }
  editMovieApi(id)   {return this.linkTo('api/editmovies/' + id)}
  loginApi()         {return '/api/login'                       }
  logoutApi()        {return this.linkTo('api/logout')          }
}

let uris = new Uris();
export default uris;
