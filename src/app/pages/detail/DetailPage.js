import React from 'react';
import { Link } from 'react-router';
import YouTube from 'react-youtube';
import Measure from 'react-measure';

class DetailPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dimensions: {},
    };
  }

  componentDidMount() {
    this.props.loadMovie(this.props.params.id);
  }

  render() {
    if (!this.props.movie) {
      return (<div>Loading</div>);
    }

    const { title, year, url, director } = this.props.movie;
    let youtubeVideoId;
    try {
      youtubeVideoId = url.split('v=')[1].split('&');
    } catch (e) {
      // youtubeVideoId = '';
    }
    console.log('width', this.state.dimensions);
    const opts = {
      height: this.state.dimensions.width * 9 / 16,
      width: this.state.dimensions.width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    return (
      <Measure
        className="container page"
        onMeasure={(dimensions) => {
          this.setState({ dimensions });
        }}
      >
        <div>
          <h3>{title}</h3>
          <Link className="center" to={`/movies?director=${director}`}>{director}</Link>
          <div className="center">{year}</div>
          {youtubeVideoId &&
            <YouTube videoId={youtubeVideoId} opts={opts} />
          }
          {!youtubeVideoId &&
            <div>{'no video found'}</div>
          }
        </div>
      </Measure>
    );
  }
}

DetailPage.propTypes = {
  movie: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    year: React.PropTypes.string,
    url: React.PropTypes.string,
    director: React.PropTypes.string,
  }),
  params: React.PropTypes.object,
  loadMovie: React.PropTypes.func.isRequired,
};

export default DetailPage;
