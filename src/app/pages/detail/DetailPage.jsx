import React from 'react';
import { Link } from 'react-router';
import VideoPlayer from './component/VideoPlayer';
import { getTitle } from '../../components/movies/MovieTitle';

class DetailPage extends React.Component {

  componentDidMount() {
    this.props.loadMovie(this.props.params.id);
  }

  render() {
    const language = this.props.lang;
    if (!this.props.movie) {
      return null;
    }

    const { title, year, url, director, country } = this.props.movie;

    return (
      <div>
        <h3>{`${getTitle(title, language)} (${year})`}</h3>
        <div className="center">{country}</div>
        <div className="center">
          {' Director: '}
          <Link to={`/movies/${director}`}>{director}</Link>
        </div>
        <div className="center">
          <VideoPlayer url={url} />
        </div>
      </div>
    );
  }
}

DetailPage.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.shape({
      de: React.PropTypes.string,
      fr: React.PropTypes.string,
      en: React.PropTypes.string,
      default: React.PropTypes.string,
    }),
    year: React.PropTypes.number,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
    country: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loadMovie: React.PropTypes.func.isRequired,
  lang: React.PropTypes.string,
};

export default DetailPage;
