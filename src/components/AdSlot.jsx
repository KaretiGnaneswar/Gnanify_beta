import { useEffect, useRef } from 'react';

export default function AdSlot({ slot, className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // no-op
    }
  }, []);

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className}`}
      style={style ?? { display: 'block' }}
      data-ad-client="ca-pub-7372845869422591"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
