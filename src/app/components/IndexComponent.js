import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import uris from '../../uris';
import Movie from './movies/MovieContainer';
import Director from './directors/DirectorComponent';

const IndexComponent = ({ movies, directors, isAuthenticated }) => {
  const moviesComponents = movies.map((movie) => (
    <li key={movie.id}>
      <Movie {...movie} />
    </li>
  ));

  const directorsComponents = directors.map((director) =>
    <Director {...director} key={director.name} />
  );

  let header;
  if (isAuthenticated) {
    header = (
      <div>
        <a href={uris.logoutApi()} className="pageLink">logout</a>
        <Link to={uris.newMoviePage()} className="pageLink">add a movie</Link>
      </div>
    );
  } else {
    header = <Link to={uris.loginPage()} className="pageLink">login</Link>;
  }

  return (
    <div className="container">
      <h1>Movies</h1>

      {header}

      <div className="center">
          {movies.length} movies
      </div>
      <div className="moviesDirector">
          {directorsComponents}
      </div>
      <div className="moviesList">
        <ul>
            {moviesComponents}
        </ul>
      </div>
    </div>
  );
};

IndexComponent.propTypes = {
  movies: React.PropTypes.array,
  directors: React.PropTypes.array,
  isAuthenticated: React.PropTypes.object,
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(IndexComponent);
