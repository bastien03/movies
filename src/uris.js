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

  /* eslint-disable no-multi-spaces, block-spacing*/
  // pages
  moviesPage()       {return '/movies/:director';                }
  loginPage()        {return '/login';                           }
  newMoviePage()     {return '/new-movie';                       }
  editMoviePage(id)  {return this.linkTo(`edit/${id}`);          }

  // API endpoints
  getMovieApi(id)    {return this.linkTo(`api/movies/${id}`);    }
  addMovieApi()      {return this.linkTo('api/movies');          }
  deleteMovieApi(id) {return this.linkTo(`api/movies/${id}`);    }
  editMovieApi(id)   {return this.linkTo(`api/editmovies/${id}`);}
  loginApi()         {return this.linkTo('api/login');           }
  logoutApi()        {return this.linkTo('api/logout');          }
  healthCheck()      {return this.linkTo('api/check');           }
  /* eslint-disable */
}

const uris = new Uris();
export default uris;
