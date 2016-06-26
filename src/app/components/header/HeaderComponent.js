import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';

class HeaderComponent extends React.Component {

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>

        <h1>Movies</h1>

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
  }
}

HeaderComponent.propTypes = {
  isAuthenticated: React.PropTypes.object,
};

export default HeaderComponent;
