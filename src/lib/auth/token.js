const KEY = 'auth_token';

export function getToken() {
  try {
    return localStorage.getItem('token') || localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('auth_token', token); // For backward compatibility
    } else {
      clearToken();
    }
  } catch {
    // ignore
  }
}

export function clearToken() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
  } catch {
    // ignore
  }
}
