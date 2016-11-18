import React from 'react';
import Movie from '../../components/movies/MovieContainer';
import Director from '../../components/directors/DirectorComponent';
import { getTitle } from '../../components/movies/MovieTitle';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      order: 'entry',
    };
  }

  componentDidMount() {
    this.props.loadAllMovies();
  }

  onSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  onOrder(e) {
    this.setState({ order: e.target.value });
  }

  render() {
    const language = this.props.lang;
    let searchTerm = this.state.searchTerm;
    let order = this.state.order;

    // filter movies whose title or director contain the search term
    let movies = this.props.movies.filter(oneMovie =>
      getTitle(oneMovie.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
      oneMovie.director.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    movies = movies.sort((a, b) => {
      switch (order) {
        case 'date':
          return parseInt(a.year, 10) - parseInt(b.year, 10);
        case 'title':
          return getTitle(a.title, language).toLowerCase()
            > getTitle(b.title, language).toLowerCase() ? 1 : -1;
        case 'director':
          return a.director.toLowerCase() > b.director.toLowerCase() ? 1 : -1;
        case 'entry':
        default:
          return a.id > b.id;
      }
    });

    const directors = this.props.directors;

    const moviesComponents = movies.map(movie =>
      <Movie {...movie} title={getTitle(movie.title, language)} key={movie.id} />);

    const directorsComponents = directors.map(director =>
      (director.numberMovies > 1 ?
        <Director {...director} key={director.name} /> :
        null),
    );

    const search = (
      <div className="searchContainer center">
        <label htmlFor="search">{'Search'}</label>
        <input
          name="search"
          ref={(node) => { searchTerm = node; }}
          onChange={e => this.onSearch(e)}
        />
      </div>
    );

    const sort = (
      <div className="orderContainer center" onChange={e => this.onOrder(e)}>
        <label htmlFor="order">{'Order by'}</label>
        <select name="order" ref={(node) => { order = node; }}>
          <option value="entry">entry</option>
          <option value="date">date</option>
          <option value="title">title</option>
          <option value="director">director</option>
        </select>
      </div>
    );

    return (
      <div>
        <div className="moviesDirector">
          {directorsComponents}
          <div>{'...'}</div>
        </div>
        {search}
        {sort}
        <div className="center">
          {movies.length} movies
        </div>
        <div className="moviesList">
          {moviesComponents}
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  movies: React.PropTypes.array.isRequired,
  directors: React.PropTypes.array.isRequired,
  loadAllMovies: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string,
};

export default IndexPage;
