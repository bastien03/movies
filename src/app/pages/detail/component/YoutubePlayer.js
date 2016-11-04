import React, { PropTypes } from 'react';
import YouTube from 'react-youtube';

const YoutubePlayer = (props) => {
  const { url, width, height, autoplay } = props;
  let videoId;
  try {
    videoId = url.split('v=')[1].split('&')[0];
  } catch (e) {
    videoId = '';
  }

  const opts = {
    height,
    width,
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay,
    },
  };
  return (
    <div>
      {videoId &&
        <YouTube videoId={videoId} opts={opts} />
      }
    </div>
  );
};

YoutubePlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  autoplay: PropTypes.bool.isRequired,
};

export default YoutubePlayer;
