import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getUserPermissions, canAccessContributor, canAccessAdmin } from '../utils/roles';
import { getProfile, logout as apiLogout } from '../services/auth';

/**
 * @typedef {Object} AuthContextType
 * @property {string|null} token - The current authentication token
 * @property {Object|null} user - The current user object
 * @property {boolean} isAuthed - Whether the user is authenticated
 * @property {boolean} loading - Whether the auth state is being loaded
 * @property {Function} login - Function to log in a user
 * @property {Function} logout - Function to log out the current user
 * @property {Object} permissions - User permissions object
 * @property {boolean} canAccessContributor - Whether the user can access contributor features
 * @property {boolean} canAccessAdmin - Whether the user can access admin features
 */

const AuthContext = createContext(/** @type {AuthContextType} */ ({
  token: null,
  user: null,
  isAuthed: false,
  loading: true,
  login: () => {},
  logout: () => {},
  permissions: {},
  canAccessContributor: false,
  canAccessAdmin: false,
}));

/**
 * AuthProvider component that manages authentication state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('auth_token') || null;
    } catch (error) {
      console.error('Error reading auth token from localStorage:', error);
      return null;
    }
  });
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthed = !!token;

  // Clear any existing error when token changes
  useEffect(() => {
    setError(null);
  }, [token]);

  // Fetch user profile when token changes
  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await getProfile();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error.message || 'Failed to load user profile');
      // Don't clear token here as it's already handled in the auth service
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial fetch and setup event listeners
  useEffect(() => {
    fetchUserProfile();

    const handleStorageChange = (event) => {
      if (event.key === 'auth_token' || event.key === null) {
        setToken(localStorage.getItem('auth_token'));
      }
    };

    const handleAuthChanged = () => {
      setToken(localStorage.getItem('auth_token'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:changed', handleAuthChanged);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:changed', handleAuthChanged);
    };
  }, [fetchUserProfile]);

  /**
   * Log in a user with a new token
   * @param {string} newToken - The authentication token
   */
  const login = useCallback((newToken) => {
    try {
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
      window.dispatchEvent(new Event('auth:changed'));
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw new Error('Failed to save authentication token');
    }
  }, []);

  /**
   * Log out the current user
   */
  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.warn('Error during logout:', error);
      // Continue with client-side cleanup even if server logout fails
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      window.dispatchEvent(new Event('auth:changed'));
    }
  }, []);

  // Get user permissions
  const permissions = getUserPermissions(user);
  const hasContributorAccess = canAccessContributor(user);
  const hasAdminAccess = canAccessAdmin(user);

  const contextValue = {
    token,
    user,
    isAuthed,
    loading,
    error,
    login,
    logout,
    permissions,
    canAccessContributor: hasContributorAccess,
    canAccessAdmin: hasAdminAccess,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook to use the auth context
 * @returns {AuthContextType} The auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
