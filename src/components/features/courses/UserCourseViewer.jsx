import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import VideoPlayer from './VideoPlayer';
import NotesModal from './NotesModal';
import ReviewModal from './ReviewModal';
import ProgressTracker from './ProgressTracker';

const UserCourseViewer = ({ courseId }) => {
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentSubTopic, setCurrentSubTopic] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // Fetch course details
      const courseResponse = await fetch(`/api/courses/${courseId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const courseData = await courseResponse.json();
      setCourse(courseData);

      // Fetch lessons
      const lessonsResponse = await fetch(`/api/courses/${courseId}/lessons/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const lessonsData = await lessonsResponse.json();
      setLessons(lessonsData);

      // Fetch enrollment status
      if (courseData.is_enrolled) {
        const enrollmentResponse = await fetch(`/api/courses/${courseId}/enroll/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const enrollmentData = await enrollmentResponse.json();
        setEnrollment(enrollmentData);
      }

      // Fetch reviews
      const reviewsResponse = await fetch(`/api/courses/${courseId}/reviews/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);

      // Set first lesson as current
      if (lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0]);
        if (lessonsData[0].subtopics && lessonsData[0].subtopics.length > 0) {
          setCurrentSubTopic(lessonsData[0].subtopics[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const enrollmentData = await response.json();
        setEnrollment(enrollmentData);
        setCourse(prev => ({ ...prev, is_enrolled: true }));
        alert('Successfully enrolled in the course!');
      } else {
        const error = await response.json();
        alert(`Enrollment failed: ${error.error}`);
      }
    } catch (error) {
      alert('Failed to enroll in the course');
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/like/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        fetchCourseData(); // Refresh course data
      }
    } catch (error) {
      console.error('Error liking course:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/dislike/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        fetchCourseData(); // Refresh course data
      }
    } catch (error) {
      console.error('Error disliking course:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch(`/api/wishlist/${courseId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        alert('Added to wishlist!');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleUpdateProgress = async (subtopicId, isCompleted, watchTime) => {
    try {
      const response = await fetch(`/api/subtopics/${subtopicId}/progress/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          is_completed: isCompleted,
          watch_time: watchTime
        }),
      });
      
      if (response.ok) {
        const progressData = await response.json();
        setProgress(prev => ({
          ...prev,
          [subtopicId]: progressData
        }));
      }
    } catch (error) {
      console.error('Error updating progress:', error);
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
        setNotes(prev => [...prev, newNote]);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleSubmitReview = async (reviewData) => {
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
        setReviews(prev => [...prev, newReview]);
        alert('Review submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Course Header */}
      <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-gray-300 mb-2">By {course.created_by_name}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>⭐ {course.average_rating} ({course.total_ratings} reviews)</span>
              <span>👥 {course.enrollments_count} students</span>
              <span>📚 {course.total_lessons} lessons</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`px-4 py-2 rounded-lg transition-colors ${
                course.is_liked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              👍 {course.likes_count}
            </button>
            <button
              onClick={handleDislike}
              className={`px-4 py-2 rounded-lg transition-colors ${
                course.is_disliked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              👎 {course.dislikes_count}
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
              {course.difficulty}
            </span>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
              {course.language}
            </span>
            {course.is_free ? (
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                Free
              </span>
            ) : (
              <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm">
                ${course.price}
              </span>
            )}
          </div>

          {!course.is_enrolled ? (
            <button
              onClick={handleEnroll}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {course.is_free ? 'Enroll for Free' : `Enroll for $${course.price}`}
            </button>
          ) : (
            <div className="text-green-400 font-semibold">✓ Enrolled</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Navigation Tabs */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Lessons
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">About this course</h2>
                <p className="text-gray-300 mb-4">{course.description}</p>
                
                {course.prerequisites && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prerequisites</h3>
                    <p className="text-gray-300">{course.prerequisites}</p>
                  </div>
                )}

                {course.learning_objectives && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">What you'll learn</h3>
                    <p className="text-gray-300">{course.learning_objectives}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'lessons' && course.is_enrolled && (
            <div className="space-y-6">
              {/* Video Player */}
              {currentSubTopic && (
                <div className="bg-gray-900/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {currentSubTopic.title}
                  </h2>
                  <VideoPlayer
                    src={currentSubTopic.video_url}
                    title={currentSubTopic.title}
                    onProgress={(progress) => {
                      handleUpdateProgress(currentSubTopic.id, false, progress);
                    }}
                    onComplete={() => {
                      handleUpdateProgress(currentSubTopic.id, true, 100);
                    }}
                  />
                </div>
              )}

              {/* Lessons List */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Course Content</h2>
                <div className="space-y-4">
                  {lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {lessonIndex + 1}. {lesson.title}
                      </h3>
                      <div className="space-y-2">
                        {lesson.subtopics.map((subtopic, subtopicIndex) => (
                          <div
                            key={subtopic.id}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                              currentSubTopic?.id === subtopic.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            }`}
                            onClick={() => setCurrentSubTopic(subtopic)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm">
                                {lessonIndex + 1}.{subtopicIndex + 1}
                              </span>
                              <span>{subtopic.title}</span>
                              {subtopic.is_preview && (
                                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">
                                {subtopic.video_duration}
                              </span>
                              {progress[subtopic.id]?.is_completed && (
                                <span className="text-green-400">✓</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {course.is_enrolled && (
                <ReviewModal
                  courseId={courseId}
                  onSubmit={handleSubmitReview}
                />
              )}
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.user_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{review.user_name}</div>
                        <div className="text-gray-400 text-sm">
                          {'⭐'.repeat(review.rating)}
                        </div>
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-300">{review.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      <span>👍 {review.helpful_votes_count} helpful</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress Tracker */}
          {course.is_enrolled && (
            <ProgressTracker
              course={course}
              enrollment={enrollment}
              progress={progress}
            />
          )}

          {/* Notes */}
          {course.is_enrolled && currentSubTopic && (
            <NotesModal
              subtopicId={currentSubTopic.id}
              notes={notes}
              onSave={handleSaveNote}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourseViewer;
