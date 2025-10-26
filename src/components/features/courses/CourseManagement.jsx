import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  CourseCard, 
  VideoPlayer, 
  NotesModal, 
  ReviewModal,
  ProgressTracker,
  CourseAnalytics
} from '@/components/features/courses';

const CourseManagement = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentSubTopic, setCurrentSubTopic] = useState(null);
  const [notes, setNotes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user can manage courses
  const canManageCourses = user?.role === 'admin' || user?.role === 'contributor';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/courses/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      
      // Filter courses based on user role
      if (user?.role === 'contributor') {
        setCourses(data.filter(course => course.created_by === user.id));
      } else {
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      const response = await fetch('/api/courses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(courseData),
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to create course' };
    }
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(courseData),
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to update course' };
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to delete course' };
    }
  };

  const handleAddLesson = async (courseId, lessonData) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lessons/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(lessonData),
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to add lesson' };
    }
  };

  const handleAddSubTopic = async (lessonId, subtopicData) => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/subtopics/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(subtopicData),
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to add sub-topic' };
    }
  };

  const handleAddVideo = async (subtopicId, videoData) => {
    try {
      const response = await fetch(`/api/subtopics/${subtopicId}/video/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(videoData),
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to add video' };
    }
  };

  const handleSaveNote = async (subtopicId, noteData) => {
    try {
      const response = await fetch(`/api/subtopics/${subtopicId}/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(noteData),
      });
      
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to save note' };
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to enroll in course' };
    }
  };

  const handleLikeCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/like/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        fetchCourses();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to like course' };
    }
  };

  const handleReviewCourse = async (courseId, reviewData) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(reviewData),
      });
      
      if (response.ok) {
        const newReview = await response.json();
        setReviews([...reviews, newReview]);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to submit review' };
    }
  };

  if (!canManageCourses) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Access Denied</h2>
          <p className="text-gray-300">
            You need contributor or admin privileges to access course management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Course Management</h1>
        <p className="text-gray-400">
          {isAdmin ? 'Manage all courses and content' : 'Manage your courses and content'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Courses</h3>
                  <p className="text-3xl font-bold text-blue-400">{courses.length}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Published</h3>
                  <p className="text-3xl font-bold text-green-400">
                    {courses.filter(c => c.status === 'published').length}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Draft</h3>
                  <p className="text-3xl font-bold text-yellow-400">
                    {courses.filter(c => c.status === 'draft').length}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    Create New Course
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">My Courses</h2>
                <button
                  onClick={() => {/* Open create course modal */}}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Create Course
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Loading courses...</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No courses found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEdit={() => {/* Open edit modal */}}
                      onDelete={() => handleDeleteCourse(course.id)}
                      onView={() => setSelectedCourse(course)}
                      canEdit={isAdmin || course.created_by === user.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <CourseAnalytics courses={courses} />
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-white">{selectedCourse.title}</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded text-sm ${
                      selectedCourse.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {selectedCourse.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Enrollments</label>
                    <p className="text-white">{selectedCourse.enrollments_count}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <p className="text-gray-300">{selectedCourse.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {/* Open edit modal */}}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={() => {/* Open lessons modal */}}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Manage Lessons
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
