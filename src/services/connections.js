import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

// Mock implementation since the backend doesn't have a connections app yet
export const connectionsApi = {
  list: async () => [],
  search: async () => [],
  sendRequest: async () => ({}),
  getRequests: async () => [],
  getOutgoingRequests: async () => [],
  acceptRequest: async () => ({}),
  rejectRequest: async () => ({}),
  getConnections: async () => [],
  removeConnection: async () => ({}),
};

// Helper functions for connections
export async function getUsers() {
  try {
    return await connectionsApi.list();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
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
    return await connectionsApi.getConnections();
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
