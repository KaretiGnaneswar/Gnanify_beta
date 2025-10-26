import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchCourses, unenrollFromCourse } from '@/services/courses';

export default function CourseConnectionsPage() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled', 'progress', 'connections'

  useEffect(() => {
    loadEnrolledCourses();
  }, []);

  const loadEnrolledCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const courses = await fetchCourses();
      // Filter only enrolled courses
      const enrolled = courses.filter(course => course.is_enrolled);
      setEnrolledCourses(enrolled);
    } catch (error) {
      setError(error.message || 'Failed to fetch enrolled courses');
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await unenrollFromCourse(courseId);
      alert('Successfully unenrolled from the course');
      loadEnrolledCourses(); // Refresh the list
    } catch (error) {
      alert(`Failed to unenroll: ${error.message}`);
      console.error('Error unenrolling from course:', error);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Course Connections</h1>
          <p className="text-gray-400">Manage your enrolled courses and track your learning progress</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'enrolled'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Enrolled Courses
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Learning Progress
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'connections'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Study Connections
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Loading your courses...</span>
          </div>
        ) : (
          <>
            {/* Enrolled Courses Tab */}
            {activeTab === 'enrolled' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    My Enrolled Courses ({enrolledCourses.length})
                  </h2>
                  <Link
                    to="/courses"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Browse More Courses
                  </Link>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No enrolled courses yet</h3>
                    <p className="text-gray-400 mb-6">Start your learning journey by enrolling in courses</p>
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                              By {course.created_by_name}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>📚 {course.total_lessons || 0} lessons</span>
                              <span>⭐ {course.average_rating || 0}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className={`font-semibold ${getProgressColor(course.progress_percentage || 0)}`}>
                              {course.progress_percentage || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(course.progress_percentage || 0)}`}
                              style={{ width: `${course.progress_percentage || 0}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link
                            to={`/courses/${course.id}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            Continue Learning
                          </Link>
                          <button
                            onClick={() => handleUnenroll(course.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                          >
                            Unenroll
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Learning Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Learning Progress</h2>
                
                {enrolledCourses.length === 0 ? (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No progress to show</h3>
                    <p className="text-gray-400 mb-6">Enroll in courses to start tracking your learning progress</p>
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                            <p className="text-gray-400 text-sm">By {course.created_by_name}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getProgressColor(course.progress_percentage || 0)}`}>
                              {course.progress_percentage || 0}%
                            </div>
                            <div className="text-sm text-gray-400">Complete</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(course.progress_percentage || 0)}`}
                            style={{ width: `${course.progress_percentage || 0}%` }}
                          ></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold text-white">{course.total_lessons || 0}</div>
                            <div className="text-sm text-gray-400">Lessons</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">
                              {Math.floor((course.progress_percentage || 0) / 100 * (course.total_lessons || 0))}
                            </div>
                            <div className="text-sm text-gray-400">Completed</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-white">
                              {course.total_lessons - Math.floor((course.progress_percentage || 0) / 100 * (course.total_lessons || 0))}
                            </div>
                            <div className="text-sm text-gray-400">Remaining</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Study Connections Tab */}
            {activeTab === 'connections' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Study Connections</h2>
                
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Connect with fellow learners</h3>
                  <p className="text-gray-400 mb-6">
                    Find study partners, join study groups, and collaborate with other students taking the same courses
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Course Study Groups</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        Join study groups for courses you're enrolled in
                      </p>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        Find Study Groups
                      </button>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Peer Learning</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        Connect with students who share similar learning goals
                      </p>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                        Find Study Partners
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
