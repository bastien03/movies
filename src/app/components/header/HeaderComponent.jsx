import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';
import LanguageSelector from './languageselector/LanguageSelectorContainer';

const LinksComponent = ({ isAuthenticated }) => (
  <div className="links">
    <Link to={uris.statisticsPage()} className="pageLink">Statistics</Link>
    {isAuthenticated &&
      <Link to={uris.newMoviePage()} className="pageLink">Add a movie</Link>
    }
    {isAuthenticated &&
      <Link to={uris.adminPage()} className="pageLink">Admin</Link>
    }
  </div>
);

const UserComponent = ({ isAuthenticated, logout, router }) => (
  <div className="right">
    {isAuthenticated &&
      <div className="pageLink logoutLink" onClick={() => logout(router)}>logout</div>
    }

    {!isAuthenticated &&
      <div><Link to={uris.loginPage()} className="pageLink">login</Link></div>
    }
  </div>
);

const HeaderComponent = ({ isAuthenticated, logout, router }) => (
  <nav className="header">
    <div className="brand">
      <Link to="/" className="pageLink">M</Link>
    </div>
    <LinksComponent isAuthenticated={isAuthenticated} />
    <UserComponent isAuthenticated={isAuthenticated} logout={logout} router={router} />
  </nav>
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
UserComponent.propTypes = HeaderComponent.propTypes;
LinksComponent.propTypes = LinksComponent.propTypes;

export default HeaderComponent;
