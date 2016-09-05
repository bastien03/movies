import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';

const HeaderComponent = ({ isAuthenticated }) => (
  <div>

    <h1><Link to="/">Movies</Link></h1>

    {isAuthenticated &&
      <div>
        <a href={uris.logoutApi()} className="pageLink">logout</a>
        <Link to={uris.newMoviePage()} className="pageLink">add a movie</Link>
      </div>
    }

    {!isAuthenticated &&
      <Link to={uris.loginPage()} className="pageLink">login</Link>
    }
  </div>
);

HeaderComponent.propTypes = {
  isAuthenticated: React.PropTypes.object,
};

export default HeaderComponent;
