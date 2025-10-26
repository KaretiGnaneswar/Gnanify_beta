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

// Helper functions for blogs
export async function getBlogs() {
  try {
    return await blogsApi.list();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlog(id) {
  try {
    return await blogsApi.detail(id);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function createBlog(blogData) {
  try {
    return await blogsApi.create(blogData);
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

export async function reactToBlog(id, reaction) {
  try {
    return await blogsApi.react(id, reaction);
  } catch (error) {
    console.error('Error reacting to blog:', error);
    throw error;
  }
}

export async function getBlogComments(id) {
  try {
    return await blogsApi.comments(id);
  } catch (error) {
    console.error('Error fetching blog comments:', error);
    return [];
  }
}

export async function addBlogComment(id, text) {
  try {
    return await blogsApi.addComment(id, text);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function deleteBlog(id) {
  try {
    return await blogsApi.delete(id);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
}
