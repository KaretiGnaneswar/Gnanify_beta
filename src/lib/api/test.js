// API Integration Test Suite
import { authApi, getProfile, updateSocial } from '@/services/auth';
import { getBlogs, createBlog, getBlog } from '@/services/blogs';
import { listCourses, getCourse } from '@/services/courses';
import { getUsers, searchUsers } from '@/services/connections';
import { getLeaderboard } from '@/services/leaderboard';

export const testApiIntegration = async () => {
  const results = {
    auth: { status: 'pending', error: null },
    blogs: { status: 'pending', error: null },
    courses: { status: 'pending', error: null },
    connections: { status: 'pending', error: null },
    leaderboard: { status: 'pending', error: null }
  };

  console.log('🧪 Starting API Integration Tests...');

  // Test Authentication
  try {
    console.log('🔐 Testing Authentication...');
    const profile = await getProfile();
    results.auth.status = 'success';
    console.log('✅ Authentication working:', profile?.email);
  } catch (error) {
    results.auth.status = 'error';
    results.auth.error = error.message;
    console.log('❌ Authentication failed:', error.message);
  }

  // Test Blogs
  try {
    console.log('📝 Testing Blogs...');
    const blogs = await getBlogs();
    results.blogs.status = 'success';
    console.log('✅ Blogs working:', blogs?.length || 0, 'blogs found');
  } catch (error) {
    results.blogs.status = 'error';
    results.blogs.error = error.message;
    console.log('❌ Blogs failed:', error.message);
  }

  // Test Courses
  try {
    console.log('📚 Testing Courses...');
    const courses = await listCourses();
    results.courses.status = 'success';
    console.log('✅ Courses working:', courses?.length || 0, 'courses found');
  } catch (error) {
    results.courses.status = 'error';
    results.courses.error = error.message;
    console.log('❌ Courses failed:', error.message);
  }

  // Test Connections
  try {
    console.log('🤝 Testing Connections...');
    const users = await getUsers();
    results.connections.status = 'success';
    console.log('✅ Connections working:', users?.length || 0, 'users found');
  } catch (error) {
    results.connections.status = 'error';
    results.connections.error = error.message;
    console.log('❌ Connections failed:', error.message);
  }

  // Test Leaderboard
  try {
    console.log('🏆 Testing Leaderboard...');
    const leaderboard = await getLeaderboard();
    results.leaderboard.status = 'success';
    console.log('✅ Leaderboard working:', leaderboard?.length || 0, 'entries found');
  } catch (error) {
    results.leaderboard.status = 'error';
    results.leaderboard.error = error.message;
    console.log('❌ Leaderboard failed:', error.message);
  }

  // Summary
  const successCount = Object.values(results).filter(r => r.status === 'success').length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n📊 API Integration Test Results: ${successCount}/${totalCount} services working`);
  
  if (successCount === totalCount) {
    console.log('🎉 All APIs are working perfectly!');
  } else {
    console.log('⚠️ Some APIs need attention. Check the errors above.');
  }

  return results;
};

// Helper function to test individual API endpoints
export const testEndpoint = async (name, testFn) => {
  try {
    console.log(`Testing ${name}...`);
    const result = await testFn();
    console.log(`✅ ${name} working`);
    return { status: 'success', result };
  } catch (error) {
    console.log(`❌ ${name} failed:`, error.message);
    return { status: 'error', error: error.message };
  }
};
