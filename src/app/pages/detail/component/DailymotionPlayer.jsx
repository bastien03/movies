import React, { PropTypes } from 'react';
import Dailymotion from 'react-dailymotion';

const DailymotionPlayer = (props) => {
  const { url, width, height, autoplay } = props;

  let videoId;
  try {
    videoId = url.split('video/')[1];
  } catch (e) {
    videoId = '';
  }

  const opts = {
    video: videoId,
    width,
    height,
    autoplay,
  };

  return (
    <div>
      {videoId &&
        <Dailymotion {...opts} uiTheme="light" />
      }
    </div>
  );
};

DailymotionPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  autoplay: PropTypes.bool.isRequired,
};

export default DailymotionPlayer;
