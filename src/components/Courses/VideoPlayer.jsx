import React, { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ src, poster, title, enforceNoSkip = false, onProgress, onComplete }) {
  const videoRef = useRef(null);
  const [maxTime, setMaxTime] = useState(0); // seconds reached without skipping
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setDuration(v.duration || 0);
    };

    const onTimeUpdate = () => {
      const t = v.currentTime || 0;
      if (t > maxTime) setMaxTime(t);
      const d = v.duration || duration || 0;
      if (d > 0 && onProgress) onProgress(Math.min(100, (t / d) * 100));
    };

    const onSeeking = () => {
      if (!enforceNoSkip) return;
      const target = v.currentTime || 0;
      // prevent seeking ahead beyond maxTime + 1s buffer
      if (target > maxTime + 1) {
        v.currentTime = Math.max(0, maxTime);
      }
    };

    const onEnded = () => {
      if (onProgress) onProgress(100);
      if (onComplete) onComplete();
    };

    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('seeking', onSeeking);
    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('seeking', onSeeking);
      v.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, enforceNoSkip, onProgress, onComplete, maxTime, duration]);

  useEffect(() => {
    // reset state when src changes
    setMaxTime(0);
  }, [src]);

  return (
    <div className="w-full">
      <video
        key={src}
        ref={videoRef}
        className="w-full rounded-lg border border-white/10 bg-black"
        controls
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title ? <div className="mt-2 text-sm text-gray-300">{title}</div> : null}
    </div>
  );
}
