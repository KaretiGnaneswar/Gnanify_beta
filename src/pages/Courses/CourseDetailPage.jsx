import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import VideoPlayer from '@/components/features/courses/VideoPlayer';
import { fetchCourse, fetchLessons, fetchSubtopics, enrollInCourse, unenrollFromCourse, likeCourse, dislikeCourse } from '@/services/courses';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [currentSubTopic, setCurrentSubTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    if (id) {
      loadCourseData();
    }
  }, [id]);

  const loadCourseData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch course details
      const courseData = await fetchCourse(id);
      setCourse(courseData);
      setIsEnrolled(courseData.is_enrolled || false);

      // Fetch lessons
      const lessonsData = await fetchLessons(id);
      setLessons(lessonsData);
      
      // Fetch subtopics for the first lesson if available
      if (lessonsData.length > 0) {
        setSelectedLesson(lessonsData[0]);
        loadSubtopics(lessonsData[0].id);
      }
    } catch (error) {
      setError(error.message || 'Failed to load course data');
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubtopics = async (lessonId) => {
    try {
      const subtopicsData = await fetchSubtopics(lessonId);
      setSubtopics(subtopicsData);
      if (subtopicsData.length > 0) {
        setCurrentSubTopic(subtopicsData[0]);
      }
    } catch (error) {
      console.error('Error fetching subtopics:', error);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setActionLoading(true);
    try {
      await enrollInCourse(id);
      setIsEnrolled(true);
      setMessage('Successfully enrolled in the course!');
      loadCourseData(); // Refresh course data to get updated enrollment status
    } catch (error) {
      setError(error.message || 'Failed to enroll in the course');
      console.error('Error enrolling in course:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnenroll = async () => {
    setActionLoading(true);
    try {
      await unenrollFromCourse(id);
      setIsEnrolled(false);
      setMessage('Successfully unenrolled from the course');
      loadCourseData();
    } catch (error) {
      setError(error.message || 'Failed to unenroll from the course');
      console.error('Error unenrolling from course:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeCourse(id);
      loadCourseData(); // Refresh to get updated like counts
    } catch (error) {
      console.error('Error liking course:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeCourse(id);
      loadCourseData(); // Refresh to get updated dislike counts
    } catch (error) {
      console.error('Error disliking course:', error);
    }
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    loadSubtopics(lesson.id);
  };

  const handleSubTopicSelect = (subtopic) => {
    setCurrentSubTopic(subtopic);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/courses" className="text-blue-500 hover:underline mb-4 inline-block">
            ← Back to Courses
          </Link>
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-white mb-4">Course not found</h1>
            <p className="text-gray-400">The course you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/courses" className="text-blue-500 hover:underline mb-2 inline-block">
                ← Back to Courses
              </Link>
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              <p className="text-gray-300 mt-2">By {course.created_by_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    course.is_liked 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  👍 {course.likes_count || 0}
                </button>
                <button
                  onClick={handleDislike}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    course.is_disliked 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  👎 {course.dislikes_count || 0}
                </button>
              </div>
              {isEnrolled ? (
                <button
                  onClick={handleUnenroll}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Unenrolling...' : 'Unenroll'}
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Messages */}
        {message && (
          <div className="mb-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Description */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">About this course</h2>
              <p className="text-gray-300 leading-relaxed">{course.description}</p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{course.total_lessons || 0}</div>
                  <div className="text-sm text-gray-400">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{course.enrollments_count || 0}</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{course.average_rating || 0}</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{course.category_name || 'N/A'}</div>
                  <div className="text-sm text-gray-400">Category</div>
                </div>
              </div>
            </div>

            {/* Video Player */}
            {currentSubTopic && currentSubTopic.video_url && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{currentSubTopic.title}</h3>
                <VideoPlayer 
                  videoUrl={currentSubTopic.video_url}
                  title={currentSubTopic.title}
                />
                <p className="text-gray-300 mt-4">{currentSubTopic.description}</p>
              </div>
            )}

            {/* Course Content */}
            {lessons.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Course Content</h2>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {index + 1}. {lesson.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">{lesson.description}</p>
                        </div>
                        <button
                          onClick={() => handleLessonSelect(lesson)}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {selectedLesson?.id === lesson.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Course Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white font-semibold">
                    {course.is_free ? 'Free' : `$${course.price || 0}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="text-white capitalize">{course.difficulty || 'Beginner'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white capitalize">{course.status || 'Published'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white">{course.language || 'English'}</span>
                </div>
              </div>
            </div>

            {/* SubTopics */}
            {subtopics.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {selectedLesson?.title || 'Lessons'}
                </h3>
                <div className="space-y-2">
                  {subtopics.map((subtopic, index) => (
                    <button
                      key={subtopic.id}
                      onClick={() => handleSubTopicSelect(subtopic)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentSubTopic?.id === subtopic.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {index + 1}. {subtopic.title}
                        </span>
                        {subtopic.is_preview && (
                          <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                            Preview
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Progress */}
            {isEnrolled && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}