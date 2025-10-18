import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-5BM9VEEF86';

export function AnalyticsListener() {
  const location = useLocation();

  // Send an initial page_view once when gtag becomes available
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20; // ~10s if interval is 500ms
    const interval = setInterval(() => {
      attempts += 1;
      if (typeof window !== 'undefined' && window.gtag) {
        const path = window.location.pathname + window.location.search;
        // Initial page view on first load
        window.gtag('event', 'page_view', {
          page_path: path,
        });
        // Also set config with debug_mode for easier verification
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: path,
        });
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const path = location.pathname + location.search;
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
    }
  }, [location]);

  return null;
}
