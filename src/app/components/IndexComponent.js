import React from 'react';
import { connect } from 'react-redux';
import Movie from './movies/MovieContainer';
import Director from './directors/DirectorComponent';
import { getDirectorMovies } from '../reducers/movies';
import { fetchMovies } from '../actions';

class IndexComponent extends React.Component {

  componentDidMount() {
    this.props.loadAllMovies();
  }

  render() {
    const movies = this.props.movies;
    const directors = this.props.directors;

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
  }
}

IndexComponent.propTypes = {
  movies: React.PropTypes.array,
  directors: React.PropTypes.array,
  params: React.PropTypes.shape({
    director: React.PropTypes.string,
  }),
  loadAllMovies: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : state.movies.all;
  return {
    movies,
    directors: state.movies.directors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadAllMovies: () => dispatch(fetchMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);
