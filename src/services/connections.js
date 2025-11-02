import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

function emitConnectionsUpdated() {
  if (typeof window !== 'undefined') {
    try { window.dispatchEvent(new Event('connections:updated')); } catch {}
  }
}

// Mock implementation since the backend doesn't have a connections app yet
export const connectionsApi = {
  list: async (query = '') => {
    const q = query?.trim() ? `?search=${encodeURIComponent(query.trim())}` : '';
    return client.get(`/connections/users/${q}`);
  },
  search: async (query = '') => {
    const q = query?.trim() ? `?search=${encodeURIComponent(query.trim())}` : '';
    return client.get(`/connections/users/${q}`);
  },
  sendRequest: async (toUserId) => {
    const res = await client.post(`/connections/requests/send/`, { to_user: toUserId });
    emitConnectionsUpdated();
    return res;
  },
  // Incoming pending requests for current user
  getRequests: async () => client.get(`/connections/requests/incoming/`),
  // Outgoing can be added later if required
  getOutgoingRequests: async () => [],
  // Fetch pending request id from a specific user to current user
  getPendingFromUser: async (userId) => client.get(`/connections/requests/pending-from/${userId}/`),
  acceptRequest: async (requestId) => {
    const res = await client.post(`/connections/requests/${requestId}/accept/`, {});
    emitConnectionsUpdated();
    return res;
  },
  rejectRequest: async (requestId) => {
    const res = await client.post(`/connections/requests/${requestId}/reject/`, {});
    emitConnectionsUpdated();
    return res;
  },
  getConnections: async (query = '') => {
    const q = query?.trim() ? `?search=${encodeURIComponent(query.trim())}` : '';
    return client.get(`/connections/users/${q}`);
  },
  getProfile: async (id) => client.get(`/connections/users/${id}/`),
  getMyConnections: async () => client.get(`/connections/my/`),
  follow: async (userId) => {
    const res = await client.post(`/connections/follow/${userId}/`, {});
    emitConnectionsUpdated();
    return res;
  },
  unfollow: async (userId) => {
    const res = await client.del(`/connections/follow/${userId}/`);
    emitConnectionsUpdated();
    return res;
  },
  canMessage: async (userId) => client.get(`/connections/can-message/${userId}/`),
  getStatus: async (userId) => client.get(`/connections/status/${userId}/`),
  removeConnection: async () => ({}),
};

// Helper functions for connections
export async function getUsers() {
  try {
    return await connectionsApi.list('');
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getConnectionProfile(id) {
  try {
    return await connectionsApi.getProfile(id);
  } catch (error) {
    console.error('Error fetching connection profile:', error);
    return null;
  }
}

export async function searchUsers(query) {
  try {
    return await connectionsApi.search(query);
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

export async function sendConnectionRequest(userId) {
  try {
    return await connectionsApi.sendRequest(userId);
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
}

export async function getConnectionRequests() {
  try {
    return await connectionsApi.getRequests();
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    return [];
  }
}

export async function getPendingRequestFromUser(userId) {
  try {
    return await connectionsApi.getPendingFromUser(userId); // { id }
  } catch (error) {
    return null;
  }
}

export async function getOutgoingRequests() {
  try {
    return await connectionsApi.getOutgoingRequests();
  } catch (error) {
    console.error('Error fetching outgoing requests:', error);
    return [];
  }
}

export async function acceptConnectionRequest(requestId) {
  try {
    return await connectionsApi.acceptRequest(requestId);
  } catch (error) {
    console.error('Error accepting connection request:', error);
    throw error;
  }
}

export async function rejectConnectionRequest(requestId) {
  try {
    return await connectionsApi.rejectRequest(requestId);
  } catch (error) {
    console.error('Error rejecting connection request:', error);
    throw error;
  }
}

export async function getMyConnections() {
  try {
    return await connectionsApi.getMyConnections();
  } catch (error) {
    console.error('Error fetching connections:', error);
    return [];
  }
}

export async function removeConnection(userId) {
  try {
    return await connectionsApi.removeConnection(userId);
  } catch (error) {
    console.error('Error removing connection:', error);
    throw error;
  }
}

export async function followUser(userId) {
  try {
    return await connectionsApi.follow(userId);
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export async function unfollowUser(userId) {
  try {
    return await connectionsApi.unfollow(userId);
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

export async function canMessageUser(userId) {
  try {
    const res = await connectionsApi.canMessage(userId);
    return !!res?.can_message;
  } catch (error) {
    console.error('Error checking message permission:', error);
    return false;
  }
}

export async function getConnectionStatus(userId) {
  try {
    return await connectionsApi.getStatus(userId); // { status: 'connected' | 'pending_outgoing' | 'pending_incoming' | 'none' | 'self' }
  } catch (error) {
    console.error('Error fetching connection status:', error);
    return { status: 'none' };
  }
}
