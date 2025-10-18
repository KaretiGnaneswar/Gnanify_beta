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
        try { console.log('[GA4] initial page_view', path); } catch {}
        // Initial page view on first load
        window.gtag('event', 'page_view', {
          page_path: path,
          debug_mode: true,
        });
        // Also set config with debug_mode for easier verification
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: path,
          debug_mode: true,
        });
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        try { console.warn('[GA4] gtag not loaded after waiting ~10s'); } catch {}
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const path = location.pathname + location.search;
      try { console.log('[GA4] route change page_view', path); } catch {}
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: path, debug_mode: true });
    }
  }, [location]);

  return null;
}
