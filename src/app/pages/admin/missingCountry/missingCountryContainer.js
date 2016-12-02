import { connect } from 'react-redux';
import MissingCountryComponent from './missingCountryComponent';
import { fetchMovies, patchMovieCountry } from './actions';

const mapDispatchToProps = () => ({
  loadMoviesWithMissingCountry: () => fetchMovies(),
  patchMovieCountry: (id, movie) => patchMovieCountry(id, movie),
});

const page = connect(
  null,
  mapDispatchToProps,
)(MissingCountryComponent);

export default page;
