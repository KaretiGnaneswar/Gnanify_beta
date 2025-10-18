import { config } from '../config';
import { ApiError } from './errors';

function joinUrl(base, path) {
  if (!path) return base;
  const b = base.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function createApiClient(
  baseUrl = config.apiBaseUrl,
  {
    getToken,
    defaultHeaders = { 'Content-Type': 'application/json' },
    timeoutMs = 15000,
    retries = 1,
    retryDelayBaseMs = 300,
  } = {}
) {
  const doFetch = async (path, options = {}) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    const headers = { ...defaultHeaders, ...(options.headers || {}) };
    if (typeof getToken === 'function') {
      const token = await getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    const url = joinUrl(baseUrl, path);

    try {
      const res = await fetch(url, { ...options, headers, signal: controller.signal });
      clearTimeout(id);

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const payload = isJson ? await res.json().catch(() => ({})) : await res.text();

      if (!res.ok) {
        if (res.status === 401) {
          try { localStorage.removeItem('auth_token'); } catch {}
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }
        throw new ApiError({
          status: res.status,
          statusText: res.statusText,
          url,
          payload,
        });
      }
      return payload;
    } catch (err) {
      clearTimeout(id);
      if (err?.name === 'AbortError') {
        throw new ApiError({ status: 408, statusText: 'Request Timeout', url, payload: null });
      }
      throw err;
    }
  };

  const request = async (path, options = {}) => {
    let attempt = 0;
    while (true) {
      try {
        return await doFetch(path, options);
      } catch (err) {
        const isApiErr = err instanceof ApiError;
        const status = isApiErr ? err.status : 0;
        const shouldRetry =
          attempt < retries && (status >= 500 || status === 0 || status === 408);
        if (!shouldRetry) throw err;
        attempt += 1;
        const wait = retryDelayBaseMs * Math.pow(2, attempt - 1);
        await sleep(wait);
      }
    }
  };

  const jsonBody = (body) => (body === undefined ? undefined : JSON.stringify(body));

  return {
    get: (path, options) => request(path, { method: 'GET', ...(options || {}) }),
    post: (path, body, options) =>
      request(path, { method: 'POST', body: jsonBody(body), ...(options || {}) }),
    put: (path, body, options) =>
      request(path, { method: 'PUT', body: jsonBody(body), ...(options || {}) }),
    patch: (path, body, options) =>
      request(path, { method: 'PATCH', body: jsonBody(body), ...(options || {}) }),
    del: (path, options) => request(path, { method: 'DELETE', ...(options || {}) }),
    baseUrl,
  };
}

export const api = createApiClient();

export function createServiceClient(serviceBaseUrl, options) {
  return createApiClient(serviceBaseUrl, options);
}
