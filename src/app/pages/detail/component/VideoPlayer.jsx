import React, { PropTypes } from 'react';
import Measure from 'react-measure';
import YouTubePlayer from './YoutubePlayer';
import DailymotionPlayer from './DailymotionPlayer';

// Componen which takes one video url as props
// and checks whether it is a youtube or a dailymotion video.
// If it is the case, it calls corresponding components to play the videos.
// VideoPlayer uses react-measure to get the width of the parent component
// and calculates from it the width and height of the video player.
class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: {},
      updated: false,
    };
  }

  updateDimensions(dimensions) {
    this.setState({
      dimensions,
      updated: true,
    });
  }

  render() {
    const { url } = this.props;
    const { width } = this.state.dimensions;
    const { updated } = this.state;

    const playerWidth = width * 0.9;
    const playerHeight = playerWidth * (9 / 16);

    const opts = {
      width: playerWidth,
      height: playerHeight,
      url,
      autoplay: false,
    };

    let player;
    if (url.includes('youtube')) {
      player = <YouTubePlayer {...opts} />;
    } else if (url.includes('dailymotion')) {
      player = <DailymotionPlayer {...opts} />;
    } else {
      player = <div>{'no video found'}</div>;
    }

    return (
      <Measure
        className="container page"
        onMeasure={(dimensions) => {
          if (this.state.dimensions.width !== dimensions.width) {
            this.updateDimensions(dimensions);
          }
        }}
      >
        <div>
          {updated && player}
        </div>
      </Measure>
    );
  }

}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoPlayer;
