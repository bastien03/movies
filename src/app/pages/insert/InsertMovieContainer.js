import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import InsertMovieComponent from './InsertMoviePage';
import addMovie from './actions';

const mapDispatchToProps = dispatch => ({
  onSaveClick: (title, year, url, director, country, awards, router) => {
    // TODO title validation
    if (!year || !url.trim() || !director.trim()) {
      return;
    }
    dispatch(addMovie({ title, year, url, director, country, awards }, router));
  },
});

const page = connect(
  null,
  mapDispatchToProps,
)(InsertMovieComponent);

export default withRouter(page);
