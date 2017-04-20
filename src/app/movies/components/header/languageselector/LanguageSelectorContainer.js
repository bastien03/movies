import { connect } from 'react-redux';
import LanguageSelector from './LanguageSelector';
import setLanguage from './actions';
import { getLanguage } from '../../../reducers/settings';


const mapStateToProps = state => ({
  lang: getLanguage(state),
});

const mapDispatchToProps = dispatch => ({
  setLanguage: lang => dispatch(setLanguage(lang)),
});

const component = connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);

export default component;
