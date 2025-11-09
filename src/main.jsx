import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'

// Ingest token/user from URL for auto-login (from Learn)
try {
  const params = new URLSearchParams(window.location.search);
  let payload = null;
  if (params.has('user')) {
    try { payload = JSON.parse(atob(params.get('user'))); } catch {}
  } else if (params.has('token')) {
    payload = { token: params.get('token') };
  }
  if (payload?.token) {
    try { localStorage.setItem('auth_token', payload.token); } catch {}
    window.dispatchEvent(new Event('auth:changed'));
  }
  if (payload) {
    // Optional: persist minimal user info for immediate UI before profile fetch
    try { localStorage.setItem('gn_user', JSON.stringify(payload)); } catch {}
  }
  if (payload) {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url.toString());
  }
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
