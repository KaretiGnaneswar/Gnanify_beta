import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

export const resumeApi = {
  list: () => client.get('/resume/'),
  create: (payload) => client.post('/resume/', payload),
  get: (id) => client.get(`/resume/${id}/`),
  update: (id, patch) => client.patch(`/resume/${id}/`, patch),
  del: (id) => client.del(`/resume/${id}/`),
  templates: () => client.get('/resume/templates/'),
  exportPdf: (id) => client.post(`/resume/${id}/export/`, {}), // placeholder if added later
};
