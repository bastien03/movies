import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';

const IndexPage = () => {
  return (
    <ul>
      <li>
        <Link className="movieEdit" to={uris.moviesStartPage()}>movies</Link>
      </li>
      <li>
        <Link className="movieEdit" to={'/'}>books</Link>
      </li>
      <li>
        <Link className="movieEdit" to={'/'}>painters</Link>
      </li>
    </ul>
  );
};

IndexPage.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default IndexPage;
