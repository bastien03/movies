import React from 'react';
import Movie from '../../components/movies/MovieContainer';
import Director from '../../components/directors/DirectorComponent';

class IndexComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  componentDidMount() {
    this.props.loadAllMovies();
  }

  onSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    let searchTerm = this.state.searchTerm;

    // filter movies whose title or director contain the search term
    const movies = this.props.movies.filter(oneMovie =>
      oneMovie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oneMovie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const directors = this.props.directors;

    const moviesComponents = movies.map((movie) => <Movie {...movie} key={movie.id} />);

    const directorsComponents = directors.map((director) =>
      (director.numberMovies > 1 ?
        <Director {...director} key={director.name} /> :
        null)
    );

    const search = (
      <div className="searchContainer center">
        <label>{'Search'}</label>
        <input
          ref={node => { searchTerm = node; }}
          onChange={(e) => this.onSearch(e)}
        ></input>
      </div>
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
        {search}
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
