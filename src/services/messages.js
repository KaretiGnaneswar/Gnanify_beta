import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

export const messagesApi = {
  openThread: async (otherUserId) => client.post('/message/threads/open/', { other_user_id: otherUserId }),
  listThreads: async () => client.get('/message/threads/'),
  getMessages: async (threadId) => client.get(`/message/threads/${threadId}/messages/`),
  sendMessage: async (threadId, text) => client.post(`/message/threads/${threadId}/messages/send/`, { text }),
  markRead: async (threadId) => client.post(`/message/threads/${threadId}/read/`, {}),
};

export async function ensureThread(otherUserId) {
  const res = await messagesApi.openThread(otherUserId);
  return res?.thread_id;
}

export async function fetchThreads() {
  return await messagesApi.listThreads();
}

export async function fetchMessages(threadId) {
  return await messagesApi.getMessages(threadId);
}

export async function sendChat(threadId, text) {
  return await messagesApi.sendMessage(threadId, text);
}
