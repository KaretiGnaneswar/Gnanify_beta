import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { getToken } from '@/lib/auth/token';

const client = createServiceClient(config.apiBaseUrl, { getToken });

export const leaderboardApi = {
  get: () => client.get('/leaderboard/'),
  getUserRank: (userId) => client.get(`/leaderboard/user/${userId}/`),
  getTopUsers: (limit = 10) => client.get(`/leaderboard/top/?limit=${limit}`),
};

// Helper functions for leaderboard
export async function getLeaderboard() {
  try {
    return await leaderboardApi.get();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function getUserRank(userId) {
  try {
    return await leaderboardApi.getUserRank(userId);
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return null;
  }
}

export async function getTopUsers(limit = 10) {
  try {
    return await leaderboardApi.getTopUsers(limit);
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
}