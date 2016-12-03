import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import InsertMovieComponent from './InsertMoviePage';
import addMovie from './actions';

const mapDispatchToProps = dispatch => ({
  onSaveClick: (e, title, year, url, director, country, router) => {
    e.preventDefault();

    // TODO title validation

    if (!year.trim() ||
        !url.trim() || !director.trim()) {
      return;
    }
    dispatch(addMovie({ title, year, url, director, country }, router));
  },
});

const page = connect(
  null,
  mapDispatchToProps,
)(InsertMovieComponent);

export default withRouter(page);
