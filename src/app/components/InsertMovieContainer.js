import { connect } from 'react-redux';
import InsertMovieComponent from './InsertMovieComponent';
import { addMovie } from '../actions';
import { history } from '../AppHistory';

const mapDispatchToProps = (dispatch) => ({
  onSaveClick: (e, title, year, url, director) => {
    e.preventDefault();
    if (!title.trim() || !year.trim() ||
        !url.trim() || !director.trim()) {
      return;
    }
    dispatch(addMovie({ title, year, url, director }));
    history().push('/');
  },
});

const Component = connect(
  null,
  mapDispatchToProps
)(InsertMovieComponent);

export default Component;
