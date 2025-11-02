/**
 * Authentication service for handling user authentication and profile management
 */

import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import { setToken, clearToken, getToken } from '@/lib/auth/token';

// Create API client with token injection
const client = createServiceClient(config.apiBaseUrl, { getToken });

/**
 * Raw API methods - direct calls to the backend
 */
const authApi = {
  signup: (payload) => client.post('/auth/signup/', payload),
  login: (payload) => client.post('/auth/login/', payload),
  profile: () => client.get('/auth/profile/'),
  updateProfile: (payload) => client.patch('/auth/profile/details/', payload),
  updateSocial: (payload) => client.patch('/auth/profile/social/', payload),
  logout: () => {
    clearToken();
    return Promise.resolve({ success: true });
  },
};

/**
 * Logs in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data and authentication token
 */
async function login(email, password) {
  try {
    const response = await authApi.login({ email, password });
    if (response?.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Login failed. Please check your credentials.';
    console.error('Login error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Registers a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user data and authentication token
 */
async function signup(userData) {
  try {
    const response = await authApi.signup(userData);
    if (response?.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Signup failed. Please try again.';
    console.error('Signup error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Fetches the current user's profile
 * @returns {Promise<Object>} User profile data
 */
async function getProfile() {
  try {
    const response = await authApi.profile();
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token might be expired, clear it
      clearToken();
    }
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Failed to fetch profile';
    console.error('Profile fetch error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Updates the user's profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated profile data
 */
async function updateProfile(profileData) {
  try {
    return await authApi.updateProfile(profileData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Failed to update profile';
    console.error('Profile update error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Updates the user's social links
 * @param {Object} socialData - Social links data
 * @returns {Promise<Object>} Updated social data
 */
async function updateSocial(socialData) {
  try {
    return await authApi.updateSocial(socialData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Failed to update social links';
    console.error('Social update error:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Logs out the current user
 * @returns {Promise<Object>} Logout confirmation
 */
function logout() {
  clearToken();
  return authApi.logout();
}

export {
  login,
  signup,
  getProfile,
  updateProfile,
  updateSocial,
  logout,
  authApi,
};
