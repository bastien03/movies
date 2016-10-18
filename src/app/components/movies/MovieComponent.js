import React from 'react';
import { Link } from 'react-router';
import Confirm from 'react-confirm-bootstrap';
import uris from '../../../uris';


class MovieComponent extends React.Component {

  onClick(e, id) {
    if (['A', 'SPAN'].includes(e.target.tagName)) {
      return;
    }
    this.props.router.push(`/detail/${id}`);
  }

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

          <Confirm
            onConfirm={(e) => this.handleDeleteClick(e, id)}
            body={`Are you sure you want to delete '${title}'?`}
            confirmText="Confirm Delete"
            title="Deleting a movie"
          >
            <button id="removeButton" className="movieRemove">remove</button>
          </Confirm>

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
      <div onClick={e => this.onClick(e, id)} className="movieContainer">
        {movieHeader}
        <article>
          <h2 className="movieTitle">{title}</h2>
        </article>
        <footer>
          <Link to={`/movies/${director}`} className="movieDirector">{director}</Link>
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
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default MovieComponent;
