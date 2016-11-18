import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';
import LanguageSelector from './languageselector/LanguageSelectorContainer';

const HeaderComponent = ({ isAuthenticated, logout, router }) => (
  <div>
    <LanguageSelector />
    <h1><Link to="/">Movies</Link></h1>

    {isAuthenticated &&
      <div>
        <div className="pageLink logoutLink" onClick={() => logout(router)}>logout</div>
        <Link to={uris.newMoviePage()} className="pageLink">add a movie</Link>
      </div>
    }

    {!isAuthenticated &&
      <Link to={uris.loginPage()} className="pageLink">login</Link>
    }
  </div>
);

HeaderComponent.propTypes = {
  isAuthenticated: React.PropTypes.shape({
    username: React.PropTypes.string,
  }),
  logout: React.PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default HeaderComponent;
