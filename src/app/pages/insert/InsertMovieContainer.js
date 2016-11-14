import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import InsertMovieComponent from './InsertMoviePage';
import addMovie from './actions';

const mapDispatchToProps = dispatch => ({
  onSaveClick: (e, title, year, url, director, router) => {
    e.preventDefault();
    if (!title.trim() || !year.trim() ||
        !url.trim() || !director.trim()) {
      return;
    }
    dispatch(addMovie({ title, year, url, director }, router));
  },
});

const page = connect(
  null,
  mapDispatchToProps,
)(InsertMovieComponent);

export default withRouter(page);
