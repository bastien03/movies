import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import InsertMovieComponent from './InsertMoviePage';
import addMovie from './actions';
import { getLanguage } from '../../../../reducers/settings';
import { getCountries } from '../../../../reducers/countries';

const mapStateToProps = state => ({
  countries: getCountries(state),
  lang: getLanguage(state),
});

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
  mapStateToProps,
  mapDispatchToProps,
)(InsertMovieComponent);

export default withRouter(page);
