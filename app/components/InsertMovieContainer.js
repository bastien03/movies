import { connect } from 'react-redux'
import InsertMovieComponent from './InsertMovieComponent'
import { addMovie } from '../actions'
import { history } from '../AppHistory';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveClick: (e, title, year, url, director) => {
      e.preventDefault();
      if (!title.trim() || !year.trim() ||
          !url.trim() || !director.trim()) {
            return;
          }
      dispatch(addMovie({title, year, url, director}));
      history().push('/');
    }
  }
}

const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertMovieComponent)

export default Component
