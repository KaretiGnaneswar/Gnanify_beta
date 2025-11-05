import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import VideoPlayer from '@/components/features/courses/VideoPlayer';
import LectureList from '@/components/features/courses/LectureList';
import AssignmentMcqModal from '@/components/features/courses/AssignmentMcqModal';
import NotesModal from '@/components/features/courses/NotesModal';
import { fetchCourse, fetchLessons, fetchSubtopics, fetchAssignments, enrollInCourse, unenrollFromCourse, likeCourse, dislikeCourse } from '@/services/courses';

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
  const [assignments, setAssignments] = useState([]);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [answers, setAnswers] = useState({});
  const [assignmentResult, setAssignmentResult] = useState(null);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [activeAssignment, setActiveAssignment] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesText, setNotesText] = useState('');

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
      const assignData = await fetchAssignments(id);
      setAssignments(assignData);
      
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
    setAssignmentResult(null);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/courses" className="text-blue-500 hover:underline mb-2 inline-block">
                ← Back to Courses
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">By {course.created_by_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    course.is_liked 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  👍 {course.likes_count || 0}
                </button>
                <button
                  onClick={handleDislike}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
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
                  className="px-4 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Unenrolling...' : 'Unenroll'}
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
            {/* Video Player */}
            {currentSubTopic && currentSubTopic.video_url && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{currentSubTopic.title}</h3>
                <VideoPlayer 
                  src={currentSubTopic.video_url}
                  title={currentSubTopic.title}
                />
                <p className="text-gray-700 dark:text-gray-300 mt-4">{currentSubTopic.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!selectedLesson) return;
                      if (!completedLessonIds.includes(selectedLesson.id)) {
                        setCompletedLessonIds((prev) => [...prev, selectedLesson.id]);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Mark Lesson Completed
                  </button>
                  <button
                    onClick={() => setNotesOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Notes
                  </button>
                </div>
              </div>
            )}

            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About this course</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{course.description}</p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{course.total_lessons || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{course.enrollments_count || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{course.average_rating || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{course.category_name || 'N/A'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {course.is_free ? 'Free' : `$${course.price || 0}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className="text-gray-900 dark:text-white capitalize">{course.difficulty || 'Beginner'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="text-gray-900 dark:text-white capitalize">{course.status || 'Published'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language:</span>
                  <span className="text-gray-900 dark:text-white">{course.language || 'English'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Content (moved from left) */}
            {lessons.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Course Content</h2>
                <LectureList
                  lectures={lessons}
                  currentId={selectedLesson?.id}
                  onSelect={(lec) => handleLessonSelect(lec)}
                  lockedIds={new Set()}
                  onOpenNotes={() => {}}
                />
              </div>
            )}

            {/* SubTopics */}
            {subtopics.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            Preview
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Assignments */}
            {selectedLesson && assignments.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignments</h3>
                {assignments
                  .filter((a) => (a.afterLectures || []).includes(selectedLesson.id))
                  .map((a) => (
                    <div key={a.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900 dark:text-white font-medium">{a.title}</h4>
                        {!completedLessonIds.includes(selectedLesson.id) && (
                          <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">Complete lesson to unlock</span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{a.description}</p>
                      {completedLessonIds.includes(selectedLesson.id) && (
                        <button
                          onClick={() => {
                            setActiveAssignment(a);
                            setAssignmentOpen(true);
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Take Assignment
                        </button>
                      )}
                    </div>
                  ))}
                {assignments.filter((a) => (a.afterLectures || []).includes(selectedLesson.id)).length === 0 && (
                  <div className="text-gray-600 dark:text-gray-400 text-sm">No assignments for this lesson.</div>
                )}
              </div>
            )}

            {/* Progress */}
            {isEnrolled && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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

      {/* Assignment Modal */}
      <AssignmentMcqModal
        open={assignmentOpen}
        assignment={activeAssignment}
        onClose={() => {
          setAssignmentOpen(false);
          setActiveAssignment(null);
        }}
        onSubmit={({ score, total, correct }) => {
          setAssignmentResult({ id: activeAssignment?.id, score, total, correct });
          setAssignmentOpen(false);
        }}
      />

      {/* Notes Modal */}
      <NotesModal
        open={notesOpen}
        lecture={currentSubTopic ? { id: currentSubTopic.id, title: currentSubTopic.title } : null}
        initialText={notesText}
        onClose={() => setNotesOpen(false)}
        onSave={(text) => {
          setNotesText(text);
          setNotesOpen(false);
        }}
      />
    </div>
  );
}