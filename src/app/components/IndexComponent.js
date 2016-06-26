import React from 'react';
import { connect } from 'react-redux';
import Movie from './movies/MovieContainer';
import Director from './directors/DirectorComponent';
import { getDirectorMovies } from '../reducers/movies';

const IndexComponent = ({ movies, directors }) => {
  const moviesComponents = movies.map((movie) => (
    <li key={movie.id}>
      <Movie {...movie} />
    </li>
  ));

  const directorsComponents = directors.map((director) =>
    <Director {...director} key={director.name} />
  );

  return (
    <div>
      <div className="center">
          {movies.length} movies
      </div>
      <div className="moviesDirector">
          {directorsComponents}
      </div>
      <div className="moviesList">
        <ul>
            {moviesComponents}
        </ul>
      </div>
    </div>
  );
};

IndexComponent.propTypes = {
  movies: React.PropTypes.array,
  directors: React.PropTypes.array,
  params: React.PropTypes.shape({
    director: React.PropTypes.string,
  }),
};

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : state.movies;
  return {
    movies,
    directors: state.directors,
  };
};

export default connect(mapStateToProps)(IndexComponent);
