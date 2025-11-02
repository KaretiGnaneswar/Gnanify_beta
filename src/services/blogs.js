import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

// Create a client with auth token
const client = createServiceClient(config.apiBaseUrl, { getToken });

export const blogsApi = {
  // Fetch all blogs
  list: () => client.get('/blogs/'),

  // Create a new blog
  create: (payload) => client.post('/blogs/', payload),

  // Get a single blog detail
  detail: (id) => client.get(`/blogs/${id}/`),

  // Like or dislike a blog
  react: (id, reaction) => client.post(`/blogs/${id}/react/`, { reaction }),

  // Get all comments for a blog
  comments: async (id) => {
    const blog = await client.get(`/blogs/${id}/`);
    return blog?.comments || [];
  },

  // Add a comment
  addComment: (id, text) => client.post(`/blogs/${id}/comment/`, { text }),

  // Delete a blog
  delete: (id) => client.del(`/blogs/${id}/`),
};

// Helper functions for frontend use
export async function getBlogs() {
  try {
    const res = await blogsApi.list();
    return res;
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
    console.error('Error fetching comments:', error);
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
