import React from 'react';
import Movie from '../../components/movies/MovieContainer';
import Director from '../../components/directors/DirectorComponent';

class IndexComponent extends React.Component {

  componentDidMount() {
    this.props.loadAllMovies();
  }

  render() {
    const movies = this.props.movies;
    const directors = this.props.directors;

    const moviesComponents = movies.map((movie) => <Movie {...movie} key={movie.id} />);

    const directorsComponents = directors.map((director) =>
      (director.numberMovies > 1 ?
        <Director {...director} key={director.name} /> :
        null)
    );

    return (
      <div>
        <div className="center">
          {movies.length} movies
        </div>
        <div className="moviesDirector">
          {directorsComponents}
          <div>{'...'}</div>
        </div>
        <div className="moviesList">
          {moviesComponents}
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

export default IndexComponent;
