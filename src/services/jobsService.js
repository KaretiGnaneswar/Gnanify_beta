import { config } from '@/lib/config';

const API_BASE_URL = `${config.apiBaseUrl}`; // already includes /api

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

// Get all jobs
const getAllJobs = async () => {
  const res = await fetch(`${API_BASE_URL}/jobs/`, { headers: getAuthHeaders() });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to load jobs: ${res.status} ${txt}`);
  }
  const data = await res.json();
  // Support both paginated and plain arrays
  return Array.isArray(data) ? data : (data.results || data.data || []);
};

// Get job by ID
const getJobById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}/`, { headers: getAuthHeaders() });
  if (!res.ok) return null;
  return res.json();
};

// Get similar jobs (excluding current job)
const getSimilarJobs = async (currentJobId) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${currentJobId}/similar/`, { headers: getAuthHeaders() });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || data.data || []);
};

// Get recommended jobs based on user skills
const getRecommendedJobs = async () => {
  const res = await fetch(`${API_BASE_URL}/jobs/recommended/`, { headers: getAuthHeaders() });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || data.data || []);
};

export default {
  getAllJobs,
  getJobById,
  getSimilarJobs,
  getRecommendedJobs,
};
