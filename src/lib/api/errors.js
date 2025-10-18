export class ApiError extends Error {
  constructor({ status, statusText, url, payload }) {
    super(`API Error ${status} ${statusText || ''}`.trim());
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.payload = payload;
  }
}
