import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';

// eslint-disable-next-line import/prefer-default-export
const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    fill: true,
    fluid: true,
    preload: 'auto',
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
      sources: [src],
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);
  useEffect(() => {
    if (player !== null) {
      player.src({ src });
    }
  }, [src]);

  return videoRef;
};

const VideoPlayer = ({ controls, autoplay }) => {
  const playerRef = usePlayer({ src: 'http://192.168.1.42/stream/stream.m3u8', controls, autoplay });

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" />
    </div>
  );
};

VideoPlayer.defaultProps = {
  controls: false,
  autoplay: true,
};

export default VideoPlayer;
