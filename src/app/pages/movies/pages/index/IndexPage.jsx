import React from 'react';
import Movie from '../../components/movies/MovieContainer';
import { getTitle } from '../../components/movies/MovieTitle';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      order: 'entry',
      sortBy: 'asc',
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

  onOrderBy(e) {
    this.setState({ sortBy: e.target.value });
  }

  render() {
    const language = this.props.lang;
    const sortBy = this.state.sortBy;
    let searchTerm = this.state.searchTerm;
    let order = this.state.order;

    // filter movies whose title or director contain the search term
    let movies = this.props.movies.filter(oneMovie =>
      getTitle(oneMovie.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
      oneMovie.director.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    movies = movies.sort((a, b) => {
      let result;
      switch (order) {
        case 'date':
          result = parseInt(a.year, 10) - parseInt(b.year, 10);
          break;
        case 'title':
          result = getTitle(a.title, language).toLowerCase()
            > getTitle(b.title, language).toLowerCase() ? 1 : -1;
          break;
        case 'director':
          result = a.director.toLowerCase() > b.director.toLowerCase() ? 1 : -1;
          break;
        case 'entry':
        default:
          result = a.id > b.id;
          break;
      }

      const ascOrDesc = sortBy === 'asc' ? 1 : -1;
      return ascOrDesc * result;
    });

    const moviesComponents = movies.map(movie =>
      <Movie {...movie} title={getTitle(movie.title, language)} key={movie.id} />);

    const sort = (
      <div className="orderContainer">
        <form onChange={e => this.onOrder(e)}>
          <label htmlFor="order">{'Order by'}</label>
          <select name="order" ref={(node) => { order = node; }}>
            <option value="entry">entry</option>
            <option value="date">date</option>
            <option value="title">title</option>
            <option value="director">director</option>
          </select>
        </form>
        <form>
          <select onChange={e => this.onOrderBy(e)}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </form>
      </div>
    );

    const search = (
      <div className="searchContainer">
        <div>
          {movies.length} movies
        </div>
        <div>
          <label htmlFor="search">{'Search'}</label>
          <input
            name="search"
            ref={(node) => { searchTerm = node; }}
            onChange={e => this.onSearch(e)}
          />
        </div>
        {sort}
      </div>
    );

    return (
      <div>
        <h1>Index</h1>
        {search}
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
