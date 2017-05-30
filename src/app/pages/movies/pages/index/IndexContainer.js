import { connect } from 'react-redux';
import IndexPage from './IndexPage';
import { getAllMovies, getAllDirectors, getDirectorMovies } from '../../reducers/movies';
import { getLanguage } from '../../../../reducers/settings';
import { getCountries, getCountryName } from '../../../../reducers/countries';
import fetchMovies from './actions';

const mapStateToProps = (state, ownProps) => {
  const director = ownProps.params.director;
  const movies = director ? getDirectorMovies(state, director) : getAllMovies(state);
  return {
    movies,
    directors: getAllDirectors(state),
    countries: getCountries(state),
    lang: getLanguage(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loadAllMovies: () => dispatch(fetchMovies()),
  getCountryName: (countries, code) => getCountryName(countries, code),
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);

export default page;
