import React from 'react';
import { Link } from 'react-router';
import VideoPlayer from './component/VideoPlayer';

class DetailPage extends React.Component {

  componentDidMount() {
    this.props.loadMovie(this.props.params.id);
  }

  render() {
    if (!this.props.movie) {
      return null;
    }

    const { title, year, url, director } = this.props.movie;

    return (
      <div>
        <h3>{`${title} (${year})`}</h3>
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
    title: React.PropTypes.string,
    year: React.PropTypes.number,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loadMovie: React.PropTypes.func.isRequired,
};

export default DetailPage;
