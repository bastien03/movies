import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';

class MovieComponent extends React.Component {

  handleDeleteClick() {}

  render() {
    const { id, title, director, year, url, isAuthenticated } = this.props;

    let movieHeader;
    if (isAuthenticated) {
      movieHeader = (
        <div>
          <button
            className="remove-btn"
            onClick={(e) => this.handleDeleteClick(e)}
          >X
          </button>
          <Link to={uris.editMoviePage(id)}>edit</Link>
        </div>
      );
    }


    return (
      <div>
        {movieHeader}
        <h2>{title}</h2>
        <a href={`?director=${director}`} className="movieDirector">{director}</a>
        <div className="movieYear">{year}</div>
        <a href={url} target="_blank" className="movieTrailer">⇝ trailer</a>
      </div>
    );
  }
}

MovieComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  director: React.PropTypes.string.isRequired,
  year: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  isAuthenticated: React.PropTypes.object,
};

export default MovieComponent;
