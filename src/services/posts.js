import { config } from '@/lib/config';
import { createServiceClient } from '@/lib/api/client';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

function mapUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    name: u.name || u.email || 'User',
    avatarUrl: u.avatarUrl || '',
    title: u.title || '',
    company: u.company || '',
  };
}

function mapComment(c) {
  return {
    id: c.id,
    author: mapUser(c.author),
    text: c.text,
    createdAt: c.created_at || c.createdAt,
  };
}

function mapPost(p) {
  return {
    id: p.id,
    author: mapUser(p.author),
    text: p.text,
    image: p.image || '',
    createdAt: p.created_at || p.createdAt,
    likes: Number(p.likes || 0),
    dislikes: Number(p.dislikes || 0),
    funny: Number(p.funny || 0),
    insightful: Number(p.insightful || 0),
    reposts: Number(p.reposts || 0),
    shares: Number(p.shares || 0),
    comments: Array.isArray(p.comments) ? p.comments.map(mapComment) : [],
    myReaction: p.my_reaction || null,
  };
}

export async function listPosts() {
  const res = await client.get('/posts/');
  const arr = Array.isArray(res) ? res : [];
  return arr.map(mapPost);
}

export async function listMyPosts() {
  const res = await client.get('/posts/?me=true');
  const arr = Array.isArray(res) ? res : [];
  return arr.map(mapPost);
}

export async function listPostsByAuthor(authorId) {
  const res = await client.get(`/posts/?author=${encodeURIComponent(authorId)}`);
  const arr = Array.isArray(res) ? res : [];
  return arr.map(mapPost);
}

export async function createPost({ author, text, image }) {
  const payload = { text: String(text || ''), image: String(image || '') };
  const res = await client.post('/posts/', payload);
  return mapPost(res);
}

async function react(id, reaction) {
  const res = await client.post(`/posts/${id}/react/`, { reaction });
  return mapPost(res);
}

export const reactApi = {
  like: (id) => react(id, 'like'),
  dislike: (id) => react(id, 'dislike'),
  funny: (id) => react(id, 'funny'),
  insightful: (id) => react(id, 'insightful'),
  repost: (id) => react(id, 'repost'),
  share: (id) => react(id, 'share'),
};

export async function getComments(id) {
  const res = await client.get(`/posts/${id}/comments/`);
  const arr = Array.isArray(res) ? res : [];
  return arr.map(mapComment);
}

export async function addComment(id, text) {
  const res = await client.post(`/posts/${id}/comment/`, { text: String(text || '') });
  return mapComment(res);
}

export async function getLikers(id) {
  const res = await client.get(`/posts/${id}/likes/`);
  const arr = Array.isArray(res) ? res : [];
  return arr.map((u) => ({
    id: u.id,
    name: u.name || u.email || 'User',
    avatarUrl: u.avatarUrl || '',
  }));
}

export async function getReactors(id, type) {
  const suffix = type === 'dislike' ? 'dislikes' : type;
  const res = await client.get(`/posts/${id}/${suffix}/`);
  const arr = Array.isArray(res) ? res : [];
  return arr.map((u) => ({
    id: u.id,
    name: u.name || u.email || 'User',
    avatarUrl: u.avatarUrl || '',
  }));
}
