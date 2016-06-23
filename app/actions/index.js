import request from 'superagent';
import uris from '../uris';

export const loadMovies = (movies) => {
    return {
        type: 'LOAD_MOVIES',
        data: movies
    }
};

export const loadUser = (user) => {
    return {
        type: 'USER',
        data: user
    }
};

export const loadCurrentMovie = (currentMovie) => {
    return {
        type: 'LOAD_MOVIE',
        data: currentMovie
    }
};

export const requestCurrentMovie = (movieId) => {
    return {
        type: 'REQUEST_CURRENT_MOVIE',
        movieId
    }
}

export const receiveCurrentMovie = (movieId, json) => {
    return {
        type: 'RECEIVE_CURRENT_MOVIE',
        movieId,
        movie: json,
        receivedAt: Date.now()
    }
}

export const movieAdded = (movie) => {
    return {
        type: 'MOVIE_ADDED',
        movie: movie
    }
}

export const userLoggedIn = (user) => {
    return {
        type: 'USER_LOGGED_IN',
        user: user
    }
}

export function fetchCurrentMovie(movieId) {
    return function (dispatch) {
        console.log('fetch', movieId)
        dispatch(requestCurrentMovie(movieId));
        console.log('dispatch')
        return request
            .get(uris.getMovieApi(movieId))
            .set('Accept', 'application/json')
            .end(function (err, res) {
                console.log('callback',err, res);
                let currentMovie = JSON.parse(res.text);
                // setState({title: currentMovie.title});
                // onLoaded(currentMovie);
                // dispatch(loadCurrentMovie(currentMovie))
                dispatch(receiveCurrentMovie(movieId, currentMovie));
                console.log('onLoaded', currentMovie);
            });
    }
}

export function addMovie(movie) {
  return function(dispatch) {
    return request
      .post(uris.addMovieApi())
      .set('Accept', 'application/json')
      .send(movie)
      .end(function (err, res) {
        let addedMovie = JSON.parse(res.text);
        dispatch(movieAdded(addedMovie));
      });
  }
}

export function login(user) {
  return function(dispatch) {
    return request
      .post(uris.loginApi())
      .set('Accept', 'application/json')
      .send(user)
      .end(function (err, res) {
        let user = JSON.parse(res.text);
        console.log('logged in', user);
        dispatch(userLoggedIn(user));
      });
  }
}
