import React from 'react';
import { Link } from 'react-router';
import uris from '../../../uris';

class MovieComponent extends React.Component {

  handleDeleteClick(e, id) {
    this.props.removeMovie(id);
  }

  render() {
    const { id, title, director, year, url, isAuthenticated } = this.props;

    let movieHeader;
    if (isAuthenticated) {
      movieHeader = (
        <header>
          <div className="movieYear">{year}</div>
          <button
            className="movieRemove"
            onClick={(e) => this.handleDeleteClick(e, id)}
          ><span>remove</span></button>
          <Link className="movieEdit" to={uris.editMoviePage(id)}>edit</Link>
          <a href={url} target="_blank" className="movieTrailer">⇝ trailer</a>
        </header>
      );
    } else {
      movieHeader = (
        <header>
          <div className="movieYear">{year}</div>
          <a href={url} target="_blank" className="movieTrailer">⇝ trailer</a>
        </header>
      );
    }


    return (
      <div key={id} className="movieContainer">
        {movieHeader}
        <article>
          <h2 className="movieTitle">{title}</h2>
        </article>
        <footer>
          <a href={`?director=${director}`} className="movieDirector">{director}</a>
        </footer>
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
  removeMovie: React.PropTypes.func.isRequired,
};

export default MovieComponent;
