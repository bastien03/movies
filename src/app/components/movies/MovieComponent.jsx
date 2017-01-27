import React from 'react';
import { Link } from 'react-router';
import Confirm from 'react-confirm-bootstrap';
import random from 'lodash/random';
import uris from '../../../uris';
import AwardLogo from './awards/AwardLogoComponent';

class MovieComponent extends React.Component {

  onClick(e, id) {
    if (['A', 'SPAN', 'BUTTON'].includes(e.target.tagName)) {
      return;
    }
    this.props.router.push(`/detail/${id}`);
  }

  handleDeleteClick(e, id) {
    this.props.removeMovie(id);
  }

  render() {
    const { id, title, director, year, url, isAuthenticated, awards } = this.props;

    let movieHeader;
    if (isAuthenticated) {
      movieHeader = (
        <header>
          <div className="movieYear">{year}</div>

          <Confirm
            onConfirm={e => this.handleDeleteClick(e, id)}
            body={`Are you sure you want to delete '${title}'?`}
            confirmText="Confirm Delete"
            title="Deleting a movie"
          >
            <button id="removeButton" className="movieRemove">remove</button>
          </Confirm>

          <Link className="movieEdit" to={uris.editMoviePage(id)}>edit</Link>
          <a
            href={url} target="_blank" rel="noreferrer noopener"
            className="movieTrailer"
          >⇝ trailer</a>
        </header>
      );
    } else {
      movieHeader = (
        <header>
          <div className="movieYear">{year}</div>
          <a
            href={url} target="_blank" rel="noreferrer noopener"
            className="movieTrailer"
          >⇝ trailer</a>
        </header>
      );
    }

    const colors = ['DarkKhaki', 'Khaki', 'LemonChiffon', 'LightGoldenRodYellow',
      'LightYellow', 'Moccasin', 'PaleGoldenRod', 'PapayaWhip', 'PeachPuff'];
    const color = colors[random(0, colors.length - 1)];

    const divStyle = {
      background: `radial-gradient(white, ${color})`,
    };

    return (
      <div
        onClick={e => this.onClick(e, id)} className="movieItemContainer"
        style={divStyle}
      >
        {movieHeader}
        <article>
          <h2 className="movieTitle">{title}</h2>
        </article>
        <footer>
          <Link to={`/movies/${director}`} className="movieDirector">{director}</Link>
          <span className="awards">
            {awards.map(award => <AwardLogo award={award} key={award} />)}
          </span>
        </footer>
      </div>
    );
  }
}

MovieComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  director: React.PropTypes.string.isRequired,
  year: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  awards: React.PropTypes.arrayOf(
    React.PropTypes.string,
  ),
  isAuthenticated: React.PropTypes.shape({
    username: React.PropTypes.string,
  }),
  removeMovie: React.PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default MovieComponent;
