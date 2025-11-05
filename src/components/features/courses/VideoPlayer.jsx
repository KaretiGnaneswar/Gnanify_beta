import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ src, title, onProgress, onComplete, autoplay = false }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <ReactPlayer
        url={src}
        playing={autoplay}
        controls
        width="100%"
        height="100%"
        onProgress={(state) => {
          if (onProgress && state?.played != null) {
            onProgress(state.played * 100);
          }
        }}
        onEnded={() => onComplete && onComplete()}
      />
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold bg-black/50 rounded px-3 py-2">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;