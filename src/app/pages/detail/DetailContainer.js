import { connect } from 'react-redux';
import DetailPage from './DetailPage';
import { fetchCurrentMovie } from './actions';
import { getCurrentMovie } from '../../reducers/movies';

const mapStateToProps = state => ({
  movie: getCurrentMovie(state),
});

const mapDispatchToProps = dispatch => ({
  loadMovie: (movieId) => {
    dispatch(fetchCurrentMovie(movieId));
  },
});

const page = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);

export default page;
