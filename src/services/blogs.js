import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

export const blogsApi = {
  list: () => client.get('/blogs/'),
  create: (payload) => client.post('/blogs/', payload),
  detail: (id) => client.get(`/blogs/${id}/`),
  react: (id, reaction) => client.post(`/blogs/${id}/react/`, { reaction }),
  comments: (id) => client.get(`/blogs/${id}/comments/`),
  addComment: (id, text) => client.post(`/blogs/${id}/comments/`, { text }),
  delete: (id) => client.del(`/blogs/${id}/`),
};
