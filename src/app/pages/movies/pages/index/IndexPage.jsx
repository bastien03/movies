import React from 'react';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getTitle } from '../../components/movies/MovieTitle';

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      order: 'entry',
      sortBy: 'asc',
    };

    this.countryFormatter = this.countryFormatter.bind(this);
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

  countryFormatter(cell, row) {
    const { country } = row;
    const { getCountryName, countries } = this.props;
    const countryName = getCountryName(countries, country);
    return countryName;
  }

  render() {
    const language = this.props.lang;
    const { movies } = this.props;

    const titleFormatter = (cell, row) => {
      const { title } = row;
      return getTitle(title, language);
    };
    const directorFormatter = director =>
      <Link to={`/movies/${director}`} className="movieDirector">{director}</Link>;

    const moviesComponents = (
      <BootstrapTable
        data={movies}
        striped
        hover
        condensed
        search
      >
        <TableHeaderColumn isKey dataField="title" dataSort dataFormat={titleFormatter}>
          Title
        </TableHeaderColumn>
        <TableHeaderColumn dataField="director" dataSort dataFormat={directorFormatter} width="30%">
          Director
        </TableHeaderColumn>
        <TableHeaderColumn dataField="year" dataSort width="10%">
          year
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="country"
          dataSort
          dataFormat={this.countryFormatter}
          width="20%"
        >
          country
        </TableHeaderColumn>
      </BootstrapTable>
    );
    return (
      <div>
        <h1>Index</h1>
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
  getCountryName: React.PropTypes.func.isRequired,
  loadAllMovies: React.PropTypes.func.isRequired,
  countries: React.PropTypes.object.isRequired,
  lang: React.PropTypes.string,
};

export default IndexPage;
